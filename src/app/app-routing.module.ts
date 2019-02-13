import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from 'src/app/home/home.component';
import { StyleguideComponent } from 'src/app/styleguide/styleguide.component';

const routes: Routes = [
  { path: '', component: LayoutComponent ,
  children: [
    { path: '', component: HomeComponent },
    ]
},
  { path: 'login', component: LoginComponent },
  { path: 'style', component: StyleguideComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
