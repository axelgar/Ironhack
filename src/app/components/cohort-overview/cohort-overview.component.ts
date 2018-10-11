import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CohortService } from 'src/app/services/cohort.service';


@Component({
  selector: 'app-cohort-overview',
  templateUrl: './cohort-overview.component.html',
  styleUrls: ['./cohort-overview.component.scss']
})
export class CohortOverviewComponent implements OnInit {
  @Input() cohortId:any;
  id: string;
  cohort: any;
  error = false;

  constructor(private cohortService: CohortService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.cohortService.getCohort(this.id)
          .then((result) => {
            this.cohort = result;
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
          })
      })
  }

}
