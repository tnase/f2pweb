import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from './../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})




export class ListPostComponent implements OnInit {
  public imagePath;
  imgUrl:any;
  email:any ;
  imgToSend: any = null;
  loading: Boolean = false ;
  isNsfw: Boolean = false;
  pictureForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    picture: new FormControl(),

  })
  constructor(private _post_service : PostService, private _route : ActivatedRoute,public router:Router) {
    this.readEmailParameter();
  }

  ngOnInit() {

  }


  readEmailParameter(){
   this._route.queryParamMap.subscribe(params=>{
        this.email = params.get('user').split(";")[0];
   })

  }




  onFieldSelected(files){
     if (files.length === 0)
       return;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
    this.imgUrl = reader.result;
    this.loading=true;
    this.imgToSend=files[0];
    }

  // this.makeRequest(files[0] , function (err, datums) {
  //         if (err) { throw err; }
  //    console.log("success  "+JSON.stringify(datums) );
  //    let  prediction=datums.result[0].prediction;
  //    let nsfw;
  //    let sfw ;
  //    for(let d of prediction)
  //    {
  //      if(d.label==="nsfw")
  //       nsfw=d;
  //      else sfw=d;
  //    }
  //    if(sfw.probability<nsfw.probability){

  //        alert("image sensible vous ne pouvez pas la poster dans notre plateforme ")
  //    }else{
  //      alert("cette image n'est pas sensible vous pouvez la poster")
  //    }


  // });



  }

  onSubmit(){
    console.log(this.pictureForm.value);
if(this.imgToSend!=null){
  let formData=new FormData() ;
  let post_service=this._post_service;
  console.log(this.email);
  formData.append('file',this.imgToSend,this.imgToSend.name);
  formData.append('title',this.pictureForm.value.title);
  formData.append('description',this.pictureForm.value.description);
  formData.append('email',this.email);
    this.makeRequest(this.imgToSend , function (err, datums) {
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
   alert("cette image n'est pas sensible place au submit")
   post_service.addPost(formData)
         .subscribe(data=>{
           console.log("success");
         },error=>{
           console.log(error);
         })
 }


});
return ;
 }  else{
   alert("dans le truc sans image ....")
   console.log(this.pictureForm.value) ;
    let formData=new FormData() ;
   formData.append('title',this.pictureForm.value.title);
   formData.append('description',this.pictureForm.value.description);
   formData.append('email', this.email) ;
   console.log("avant le submit") ;
   this._post_service.addPost(formData)
         .subscribe(data=>{
          this.router.navigate(['/posts'], { queryParams: {email: this.email } });
           console.log("success");
         },error=>{
           console.log(error);
         })
         return ;
}




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
