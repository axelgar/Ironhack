import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DragulaService } from 'ng2-dragula';

import { CohortService } from 'src/app/services/cohort.service';

@Component({
  selector: 'app-cohort-details-page',
  templateUrl: './cohort-details-page.component.html',
  styleUrls: ['./cohort-details-page.component.scss']
})
export class CohortDetailsPageComponent implements OnInit {
  id: string;
  cohort: any;
  error = false;
  calendar = true;

  constructor(private cohortService: CohortService, private route: ActivatedRoute, private dragulaService: DragulaService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.cohortService.getCohort(this.id)
          .subscribe((cohort) => {
            this.cohort = cohort;
          })
      })
  }

  handleToggleClickCalendar() {
    this.calendar = true;
  }

  handleToggleClickOverview() {
    this.calendar = false;
  }
}
