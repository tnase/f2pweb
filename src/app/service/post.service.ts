import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(post){
      return this.http.post(API.ADD_POST+`?file=${post}`, {});
  }

}
