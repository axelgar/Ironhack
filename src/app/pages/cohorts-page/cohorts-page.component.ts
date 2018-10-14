import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

import { CohortService } from 'src/app/services/cohort.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cohort-page',
  templateUrl: './cohorts-page.component.html',
  styleUrls: ['./cohorts-page.component.scss']
})
export class CohortsPageComponent implements OnInit {
  cohorts: Array<any> = [];
  error = false;
  currentLocation = location.pathname;

  constructor(private cohortService: CohortService, private authService: AuthService) { }

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