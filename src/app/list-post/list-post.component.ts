import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})




export class ListPostComponent implements OnInit {
  public imagePath;
  imgUrl:any;
  loading:any ;
  pictureForm=new FormGroup({
    picture:new FormControl()
  })
  constructor() { }

  ngOnInit() {

  }




  onFieldSelected(files){
     if (files.length === 0)
       return;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
    this.imgUrl = reader.result;
    }

    // let a=this.verifyImage(files[0]);
    // console.log("tona"+a);

   this.makeRequest(files[0] , function (err, datums) {
     if (err) { throw err; }
     console.log("success  "+JSON.stringify(datums) );
     let data=datums.result[0].prediction;
     let nsfw;
     let sfw ;
     for(let d of data)
     {
       if(d.label==="nsfw")
        nsfw=d;
       else sfw=d
     }

     if(sfw.probability<nsfw.probability){
       alert("image porno")
     }



    });

  }


  onSubmit(){

  this.imgUrl= this.pictureForm.value.picture ;


  }

  verifyImage(file):any{


             this.loading=true;
            var data = new FormData();
            data.append('modelId', 'dc2307f6-714c-4ce6-9913-b23e11b398ca');
            data.append('file', file); // file is a Blob object

            var xhr = new XMLHttpRequest();
              xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                console.log(this.responseText);
              }
            });

            xhr.open("POST", "https://app.nanonets.com/api/v2/ImageCategorization/LabelFile/");
            xhr.setRequestHeader("authorization", "Basic " + btoa("cNICH5KFzrF6ofTSQCOjGYEsTs-pTAc-:"));
            xhr.send(data);

  }

 makeRequest ( file,done) {
  var data = new FormData();
  data.append('modelId', 'dc2307f6-714c-4ce6-9913-b23e11b398ca');
  data.append('file', file);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "https://app.nanonets.com/api/v2/ImageCategorization/LabelFile/");
   // xhr.open(method, url);
    xhr.onload = function () {
      done(null, xhr.response);
    };
    xhr.onerror = function () {
      done(xhr.response);
    };

    xhr.setRequestHeader("authorization", "Basic " + btoa("cNICH5KFzrF6ofTSQCOjGYEsTs-pTAc-:"));
    xhr.send(data);
    //xhr.send();
  }









}
