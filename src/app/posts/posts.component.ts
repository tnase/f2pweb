import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  email:any ;
  constructor(private _route : ActivatedRoute) {
    this.readEmailParameter();
   }

  ngOnInit() {
  }

  readEmailParameter(){
    this._route.queryParamMap.subscribe(params=>{
         this.email = params.get('email');
    })
   }



}
