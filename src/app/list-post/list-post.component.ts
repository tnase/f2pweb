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
  imgToSend:any;
  loading:Boolean=false ;
  isNsfw:Boolean =false;
  pictureForm=new FormGroup({
    picture:new FormControl()
  })
  constructor() { }

  ngOnInit() {

  }




  onFieldSelected(files,target){
     if (files.length === 0)
       return;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
    this.imgUrl = reader.result;
    this.loading=true;
    console.log(target)
    this.imgToSend=files[0];
    }

  this.makeRequest(files[0] , function (err, datums) {
          if (err) { throw err; }
     console.log("success  "+JSON.stringify(datums) );
     let  prediction=datums.result[0].prediction;
     let nsfw;
     let sfw ;
     for(let d of prediction)
     {
       if(d.label==="nsfw")
        nsfw=d;
       else sfw=d;
     }
     if(sfw.probability<nsfw.probability){

         alert("image sensible vous ne pouvez pas la poster dans notre plateforme ")
     }else{
       alert("cette image n'est pas sensible vous pouvez la poster")
     }


  });



  }

  onSubmit(){
    console.log(this.imgToSend)
  }


 makeRequest (file,done) {
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
    xhr.onerror =  function(){
      done(xhr.response);
    };

    xhr.setRequestHeader("authorization", "Basic " + btoa("cNICH5KFzrF6ofTSQCOjGYEsTs-pTAc-:"));
    xhr.send(data);

  }









}
