import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-module-one-units',
  templateUrl: './module-one-units.component.html',
  styleUrls: ['./module-one-units.component.scss']
})
export class ModuleOneUnitsComponent implements OnInit {
  @Input() cohortId: any;
  id: string;
  curriculum: any;
  error = false;
  name: string;
  searchText: string = "";

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

  clearFilter() {
    this.searchText = "";
  }

}
