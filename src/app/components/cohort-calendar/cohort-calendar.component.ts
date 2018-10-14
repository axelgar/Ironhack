import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CohortService } from 'src/app/services/cohort.service';
import { Subscription } from 'rxjs';
import { DragulaHandler } from '../../services/dragula.service';

@Component({
  selector: 'app-cohort-calendar',
  templateUrl: './cohort-calendar.component.html',
  styleUrls: ['./cohort-calendar.component.scss']
})
export class CohortCalendarComponent implements OnInit {
  @Input() cohortId: any;
  id: string;
  cohort: any;
  error = false;
  subs = new Subscription();

  constructor(
    private cohortService: CohortService, 
    private route: ActivatedRoute, 
    private dragulaService: DragulaHandler) {
   }

  ngOnInit() {
   this.dragulaService.listenTo();
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.cohortService.getCohort(this.id)
          .subscribe((cohort) => {
            this.cohort = cohort;
          })
      })
  } 
}
