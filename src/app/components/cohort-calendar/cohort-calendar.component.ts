import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { CohortOverviewComponent } from '../cohort-overview/cohort-overview.component';
import { CohortService } from 'src/app/services/cohort.service';

@Component({
  selector: 'app-cohort-calendar',
  templateUrl: './cohort-calendar.component.html',
  styleUrls: ['./cohort-calendar.component.scss']
})
export class CohortCalendarComponent implements OnInit, OnDestroy {
  @Input() cohort: any;
  id: string;
  error = false;
  subs = new Subscription();

  constructor(
    private dragulaService: DragulaService,
    private cohortService: CohortService ) {
   }

  ngOnInit() {
    this.subs.add(
      this.dragulaService.dropModel
      .subscribe((value) => {
      console.log("dropModel")
      const element = value[1].id;
      const to = value[2].id;
      const from = value[3].id;
      this.cohortService.shiftUnit(from, to, element);
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
