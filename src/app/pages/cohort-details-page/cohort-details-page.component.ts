import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CohortService } from 'src/app/services/cohort.service';
import { Subscription } from 'rxjs';
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
      });
  }

  handleToggleClickCalendar() {
    this.calendar = true;
  }

  handleToggleClickOverview() {
    this.calendar = false;
  }

  ngOnDestroy () {
    this.destroySubject$.next();
  }

}
