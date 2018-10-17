import { Component, OnInit } from '@angular/core';

import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-curriculums-page',
  templateUrl: './curriculums-page.component.html',
  styleUrls: ['./curriculums-page.component.scss']
})
export class CurriculumPageComponent implements OnInit {
  curricula: Array<any> = [];
  error = false;
  loading: boolean = true;

  constructor(private curriculumService:CurriculumService) { }

  ngOnInit() {
    this.curriculumService.list()
      .then((results) => {
        this.loading = false;
        this.curricula = results;
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
  }
}
