import { Component, OnInit } from '@angular/core';
import { CohortService } from 'src/app/services/cohort.service';

@Component({
  selector: 'app-cohort-page',
  templateUrl: './cohorts-page.component.html',
  styleUrls: ['./cohorts-page.component.scss']
})
export class CohortsPageComponent implements OnInit {
  cohorts: Array<any> = [];
  error = false;

  constructor(private cohortService:CohortService) { }

  ngOnInit() {
    this.cohortService.list()
      .then((results) => {
        this.cohorts = results;
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
  }
}