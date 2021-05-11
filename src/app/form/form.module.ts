import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRoutingModule } from './form-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveLoginComponent } from './reactive-login/reactive-login.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent,
    ReactiveLoginComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class FormModule { }
