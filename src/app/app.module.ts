import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DragulaModule } from 'ng2-dragula';
import { FileUploadModule } from 'ng2-file-upload';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 5,
  spaceBetween: 10,
  breakpoints: {
    // when window width is <= 320px
    415: {
      slidesPerView: 1,
      // spaceBetween: 10
    },
    768: {
      slidesPerView: 2,
      // spaceBetween: 10
    },
    // when window width is <= 480px
    1028: {
      slidesPerView: 3,
      // spaceBetween: 20
    },
    // when window width is <= 640px
    // 1028: {
    //   slidesPerView: 5,
    //   // spaceBetween: 30
    // }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
};


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
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';

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

import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersCreatePageComponent } from './pages/users-create-page/users-create-page.component';
import { AddUnitComponent } from './components/add-unit/add-unit.component';
import { CohortDriveComponent } from './components/cohort-drive/cohort-drive.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CohortCalendarViewComponent } from './components/cohort-calendar-view/cohort-calendar-view.component';
import { SearchPipe } from './pipes/search.pipe';




const routes: Routes = [
  { path: '', component: CohortsPageComponent, canActivate: [RequireUserGuard, RequireStaffGuard]},
  { path: 'login', component: LogInPageComponent, canActivate: [RequireAnonGuard]},
  { path: 'cohort', component: CohortsPageComponent, canActivate: [RequireUserGuard, RequireStaffGuard]},
  { path: 'cohort/create', component: CohortCreatePageComponent, canActivate: [RequireUserGuard, RequireStaffGuard]},
  { path: 'cohort/:id', component: CohortDetailsPageComponent, canActivate: [RequireUserGuard]},
  { path: 'curriculums', component: CurriculumPageComponent, canActivate: [RequireUserGuard, RequireStaffGuard]},
  { path: 'curriculum/:id', component: CurriculumDetailPageComponent, canActivate: [RequireUserGuard, RequireStaffGuard]},
  { path: 'unit/:id', component: UnitDetailPageComponent, canActivate: [RequireUserGuard]},
  { path: 'users', component: UsersPageComponent, canActivate: [RequireUserGuard]},
  { path: 'user/create/:id', component: UsersCreatePageComponent, canActivate: [RequireUserGuard]},
  { path: 'user/settings', component: ProfileSettingsPageComponent, canActivate: [RequireUserGuard]},
  { path: 'user/edit', component: ProfileEditPageComponent, canActivate: [RequireUserGuard]},
  { path: 'user/:id', component: ProfilePageComponent, canActivate: [RequireUserGuard]},
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
    UsersPageComponent,
    UsersCreatePageComponent,
    AddUnitComponent,
    ProfilePageComponent,
    ProfileSettingsPageComponent,
    ProfileEditPageComponent,
    CohortDriveComponent,
    LoadingComponent,
    CohortCalendarViewComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    DragulaModule,
    FileUploadModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
