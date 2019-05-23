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
  }

  onSubmit(){

  this.imgUrl= this.pictureForm.value.picture ;
  }




}
