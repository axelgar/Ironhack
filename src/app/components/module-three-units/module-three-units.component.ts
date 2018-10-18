import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-module-three-units',
  templateUrl: './module-three-units.component.html',
  styleUrls: ['./module-three-units.component.scss']
})
export class ModuleThreeUnitsComponent implements OnInit {
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
