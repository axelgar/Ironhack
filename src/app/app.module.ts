import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';


const routes: Routes = [
  { path: 'login', component: LogInPageComponent},
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LogInPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
