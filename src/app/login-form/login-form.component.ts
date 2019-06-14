import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  email:String = "";
  password :String="";
  isLogin:Boolean =false;

  loginForm= new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(public userService:UserServiceService,public router:Router) { }

  ngOnInit() {
  }






  login(){
    this.userService.login(this.loginForm.value.email,this.loginForm.value.password)
    .subscribe(data=>{
           let user=this.loginForm.value.email+";"+this.loginForm.value.password.trim() ;
           alert(JSON.stringify(data))
           if(data===true){
              this.isLogin=true;
              this.email= "" ;
              this.password="";
              this.router.navigate(['/list-post'], { queryParams: {user: user } });
              return  ;
           }
           alert("username or password is incorrect!!")
              return  ;

    },error=>{
       console.log(JSON.stringify(error))
    })
  }

}
