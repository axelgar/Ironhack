import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cohort-calendar',
  templateUrl: './cohort-calendar.component.html',
  styleUrls: ['./cohort-calendar.component.scss']
})
export class CohortCalendarComponent implements OnInit {
  @Input() cohortId: any;
  constructor() { }

  ngOnInit() {
  }

}
