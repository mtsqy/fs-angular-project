import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    CoreModule
  ]
})
export class HomeModule { }
