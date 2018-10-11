import { Component, OnInit } from '@angular/core';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-cohort-page',
  templateUrl: './curriculum-detail-page.component.html',
  styleUrls: ['./curriculum-detail-page.component.scss']
})
export class CurriculumDetailPageComponent implements OnInit {
  curriculum: any;
  error = false;
  id: string;

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
}