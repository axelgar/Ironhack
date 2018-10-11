import { Component, OnInit } from '@angular/core';
import { CohortService } from 'src/app/services/cohort.service';
import { ActivatedRoute } from "@angular/router";

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

  constructor(private cohortService: CohortService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.cohortService.getCohort(this.id)
          .then((result) => {
            this.cohort = result;
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
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
