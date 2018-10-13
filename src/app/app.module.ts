import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { CohortsPageComponent } from './pages/cohorts-page/cohorts-page.component';
import { CohortCreatePageComponent } from './pages/cohort-create-page/cohort-create-page.component';
import { CurriculumPageComponent } from './pages/curriculums-page/curriculums-page.component';
import { CurriculumDetailPageComponent } from './pages/curriculum-detail-page/curriculum-detail-page.component';
import { UnitDetailPageComponent } from './pages/unit-detail-page/unit-detail-page.component';
import { CohortDetailsPageComponent } from './pages/cohort-details-page/cohort-details-page.component';

import { InitAuthGuard } from './guards/init-auth.guard';
import { RequireAnonGuard } from './guards/require-anon.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { RequireAdminGuard } from './guards/require-admin.guard';
import { RequireStaffGuard } from './guards/require-staff.guard';
import { RequireStudentGuard } from './guards/require-student.guard';

import { ModuleOneUnitsComponent } from './components/module-one-units/module-one-units.component';
import { ModuleTwoUnitsComponent } from './components/module-two-units/module-two-units.component';
import { ModuleThreeUnitsComponent } from './components/module-three-units/module-three-units.component';
import { CohortCalendarComponent } from './components/cohort-calendar/cohort-calendar.component';
import { CohortOverviewComponent } from './components/cohort-overview/cohort-overview.component';
import { ArrowBackComponent } from './components/arrow-back/arrow-back.component';

import { DragulaHandler } from './services/dragula.service';


const routes: Routes = [
  { path: 'login', component: LogInPageComponent, canActivate: [RequireAnonGuard]},
  { path: 'cohort', component: CohortsPageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
  { path: 'cohort/create', component: CohortCreatePageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
  { path: 'cohort/:id', component: CohortDetailsPageComponent, canActivate: [RequireUserGuard]},
  { path: 'curriculums', component: CurriculumPageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
  { path: 'curriculum/:id', component: CurriculumDetailPageComponent, canActivate: [RequireUserGuard, RequireAdminGuard]},
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
    UnitDetailPageComponent,
    CohortDetailsPageComponent,
    CohortCalendarComponent,
    CohortOverviewComponent,
    ModuleOneUnitsComponent,
    ModuleTwoUnitsComponent,
    ModuleThreeUnitsComponent,
    ArrowBackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    DragulaModule
  ],
  providers: [
    DragulaHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
