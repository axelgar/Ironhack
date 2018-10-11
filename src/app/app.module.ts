import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { CohortsPageComponent } from './pages/cohorts-page/cohorts-page.component';
import { CohortCreatePageComponent } from './pages/cohort-create-page/cohort-create-page.component';
import { CohortCalendarPageComponent } from './pages/cohort-calendar-page/cohort-calendar-page.component';
import { CohortOverviewPageComponent } from './pages/cohort-overview-page/cohort-overview-page.component';
import { CurriculumPageComponent } from './pages/curriculums-page/curriculums-page.component';
import { CurriculumDetailPageComponent } from './pages/curriculum-detail-page/curriculum-detail-page.component';
import { UnitDetailPageComponent } from './pages/unit-detail-page/unit-detail-page.component';

import { InitAuthGuard } from './guards/init-auth.guard';
import { RequireAnonGuard } from './guards/require-anon.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { RequireAdminGuard } from './guards/require-admin.guard';
import { RequireStaffGuard } from './guards/require-staff.guard';
import { RequireStudentGuard } from './guards/require-student.guard';


const routes: Routes = [
  { path: 'login', component: LogInPageComponent, canActivate: [RequireAnonGuard]},
  { path: 'cohort', component: CohortsPageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
  { path: 'curriculums', component: CurriculumPageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
  { path: 'curriculum/:id', component: CurriculumDetailPageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
  { path: 'cohort/:id/calendar', component: CohortCalendarPageComponent, canActivate: [RequireUserGuard]},
  { path: 'cohort/:id/overview', component: CohortOverviewPageComponent, canActivate: [RequireUserGuard]},
  { path: 'cohort/create', component: CohortCreatePageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
  { path: 'unit/:id', component: UnitDetailPageComponent, canActivate: [RequireUserGuard]},
  { path: '**', component: NotFoundPageComponent, canActivate: [InitAuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LogInPageComponent,
    CohortsPageComponent,
    CurriculumPageComponent,
    CurriculumDetailPageComponent,
    CohortCreatePageComponent,
    CohortCalendarPageComponent,
    CohortOverviewPageComponent,
    UnitDetailPageComponent
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
