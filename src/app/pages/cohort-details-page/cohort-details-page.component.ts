import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CohortService } from 'src/app/services/cohort.service';
import { Subscription, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-cohort-details-page',
  templateUrl: './cohort-details-page.component.html',
  styleUrls: ['./cohort-details-page.component.scss']
})
export class CohortDetailsPageComponent implements OnInit, OnDestroy {
  id: string;
  cohort: any;
  error = false;
  calendar = true;
  overview = false;
  addUnit = false;
  destroySubject$: Subject<void> = new Subject();
  
  constructor(
    private cohortService: CohortService, 
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(params => {
        this.id = params.id;
      });
      this.cohortService.getCohort(this.id)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe(cohort => {
      this.cohort = cohort;
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

  handleToggleClickCalendar() {
    this.calendar = true;
    this.overview = false;
    this.addUnit = false;
  }

  handleToggleClickOverview() {
    this.calendar = false;
    this.overview = true;
    this.addUnit = false;
  }

  handleToggleClickAddUnit() {
    this.calendar = false;
    this.overview = false;
    this.addUnit = true;
  }

  ngOnDestroy () {
    this.destroySubject$.next();
  }


}
