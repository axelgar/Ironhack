import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { CohortService } from 'src/app/services/cohort.service';
import { Subscription, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-cohort-details-page',
  templateUrl: './cohort-details-page.component.html',
  styleUrls: ['./cohort-details-page.component.scss']
})
export class CohortDetailsPageComponent implements OnInit, OnDestroy {
  id: string;
  cohort: any;
  error = false;
  overview = false;
  addUnit = false;
  drive = false;
  calendarView = true;
  loading: boolean = true;
  destroySubject$: Subject<void> = new Subject();
  currentUser: any;
  isStudent = false;
  
  constructor(
    private cohortService: CohortService, 
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.route.params
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(params => {
        this.id = params.id;
      });
      this.cohortService.getCohort(this.id)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(cohort => {
      this.loading= false;
      this.cohort = cohort;
      if(this.currentUser.role === 'student' && this.currentUser.cohort !== this.id ) {
        this.router.navigate([`/not-found`])
      }
      if (this.currentUser.role === 'student') {
        this.isStudent = true;
      }

      this.cohort.days.forEach((day) => {
        day.units.sort((a, b) => { 
          return a.position - b.position;
        });
      });
    },
    error => {
      this.error = error;
      console.log(this.error)
      return throwError(error)
    })
  }

  handleToggleClickOverview() {
    this.overview = true;
    this.addUnit = false;
    this.drive = false;
    this.calendarView = false;
  }

  handleToggleClickAddUnit() {
    this.overview = false;
    this.addUnit = true;
    this.drive = false;
    this.calendarView = false;
  }
  handleToggleClickDrive() {
    this.overview = false;
    this.addUnit = false;
    this.drive = true;
    this.calendarView = false;
  }

  handleToggleClickCalendarView() {
    this.overview = false;
    this.addUnit = false;
    this.drive = false;
    this.calendarView = true;
  }

  ngOnDestroy () {
    this.destroySubject$.next();
  }


}
