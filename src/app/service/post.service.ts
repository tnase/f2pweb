import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(post){
      return this.http.post(API.ADD_POST, post);
  }

  getPostByUser(email){
    return this.http.get(API.GET_USER_POST+"?email="+email);
  }

  getImage(fileName){
    return this.http.get(API.GET_IMAGE+"?fileName="+fileName);
  }


}
