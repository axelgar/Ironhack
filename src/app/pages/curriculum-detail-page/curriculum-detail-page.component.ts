import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-cohort-page',
  templateUrl: './curriculum-detail-page.component.html',
  styleUrls: ['./curriculum-detail-page.component.scss']
})
export class CurriculumDetailPageComponent implements OnInit {
  units: Array<any> = [];
  error = false;

  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.unitService.list()
      .then((results) => {
        this.units = results;
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
  }
}