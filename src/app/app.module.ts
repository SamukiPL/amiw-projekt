import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatTabsModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
