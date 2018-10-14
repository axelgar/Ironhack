import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-cohort-page',
  templateUrl: './curriculum-detail-page.component.html',
  styleUrls: ['./curriculum-detail-page.component.scss']
})
export class CurriculumDetailPageComponent implements OnInit {
  curriculum: any;
  error = false;
  id: string;
  mOne = true;
  mTwo = false;
  mThree = false;

  constructor(private curriculumService: CurriculumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.curriculumService.getOne(this.id)
          .then((result) => {
            this.curriculum = result;
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
          })
      })
  }

  handleToggleClickMOne() {
    this.mOne = true;
    this.mTwo = false;
    this.mThree = false;
  }

  handleToggleClickMTwo() {
    this.mOne = false;
    this.mTwo = true;
    this.mThree = false;
  }

  handleToggleClickMThree() {
    this.mOne = false;
    this.mTwo = false;
    this.mThree = true;
  }
}