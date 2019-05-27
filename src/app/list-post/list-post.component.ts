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
      console.log(this.imgUrl);

    this.verifyImage(files[0])
  }

  onSubmit(){

  this.imgUrl= this.pictureForm.value.picture ;


  }

  verifyImage(file){
    console.log(file)
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




}
