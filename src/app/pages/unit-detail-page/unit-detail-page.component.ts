import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit-detail-page',
  templateUrl: './unit-detail-page.component.html',
  styleUrls: ['./unit-detail-page.component.scss']
})
export class UnitDetailPageComponent implements OnInit {
  id: string;
  unit: any;
  error = false;
  loading = true;

  constructor(private unitService: UnitService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.unitService.getUnit(this.id)
          .then((result) => {
            this.loading = false;
            this.unit = result;
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
          })
      })
  }
}