import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cohort-calendar-view',
  templateUrl: './cohort-calendar-view.component.html',
  styleUrls: ['./cohort-calendar-view.component.scss']
})
export class CohortCalendarViewComponent implements OnInit {
  @Input() cohort: any;
  @Input() currentUser: any;
  error = false;
  loading = false;
  editable = false;
  view = true;

  constructor() {}

  ngOnInit() {

  }

  handleToggleClickCalendar() {
    this.editable = !this.editable;
    this.view = !this.view;
  }
}
