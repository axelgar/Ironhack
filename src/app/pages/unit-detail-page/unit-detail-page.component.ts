import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

import { UnitService } from 'src/app/services/unit.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-unit-detail-page',
  templateUrl: './unit-detail-page.component.html',
  styleUrls: ['./unit-detail-page.component.scss']
})
export class UnitDetailPageComponent implements OnInit {
  id: string;
  unit: any;
  error = false;
  currentUser: any;

  constructor(
    private unitService: UnitService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private _location: Location,
    private authService: AuthService) {}

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.unitService.getUnit(this.id)
          .then((result) => {
            this.unit = result; 
            return this.authService.getUser()
          })
          .then((result) => {
            return this.currentUser = result;
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
          })
      })
  }

  // handleDeleteUnit(id) {
  //   this.unitService.deleteUnit(id)
  //     .then(() => this._location.back())
  //     .catch((error) => {
  //       console.log(error);
  //       this.error = true;
  //     })
  // }
}