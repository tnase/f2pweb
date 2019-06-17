import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './../service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  email:any ;
  post:any;
  constructor(private _route : ActivatedRoute,private _post_service :PostService) {
    this.readEmailParameter();
    this.getPostByUser();
   }

  ngOnInit() {
  }

  readEmailParameter(){
    this._route.queryParamMap.subscribe(params=>{
         this.email = params.get('email');
    })
   }

   getPostByUser(){
     this._post_service.getPostByUser(this.email)
                       .subscribe(data=>{
                         this.post=data ;
                          console.log(JSON.stringify(data));
                       },error=>{
                             console.log(error);
                       })
   }



}
