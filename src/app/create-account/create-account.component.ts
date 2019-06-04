import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserServiceService } from './../user-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor( public userService :UserServiceService) { }

  ngOnInit() {
  }


  createAccountForm= new FormGroup({
    phone: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  register(){
     this.userService.createUser(this.createAccountForm.value)
     .subscribe(data=>{
        console.log(data);
     },error=>{
       console.log(JSON.stringify(error));
     })

  }

}
