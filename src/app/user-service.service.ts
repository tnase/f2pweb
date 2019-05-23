import { environment } from './../environments/environment';

import { HttpClient,  } from '@angular/common/http';
import { API } from 'src/environments/environment';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private http : HttpClient) {

  }


   createUser(user){

     return this.http.post(`${API.SAVE_USER}`, user) ;
   }

   login(email,password){
     return this.http.get(`${API.LOGIN_USER}?email=${email}&password=${password}`);
   }

}
