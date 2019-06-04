import { CreateAccountComponent } from './create-account/create-account.component';
import { ListPostComponent } from './list-post/list-post.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login',  pathMatch: 'full' },
  {
    path: 'new-user',
    component: UserComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'list-post',
    component: ListPostComponent
  },
  {
    path: 'register',
    component: CreateAccountComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
