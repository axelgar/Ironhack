import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cohort-overview',
  templateUrl: './cohort-overview.component.html',
  styleUrls: ['./cohort-overview.component.scss']
})
export class CohortOverviewComponent implements OnInit {
  @Input() cohort: any;
  id: string;
  error = false;

  constructor() { }

  ngOnInit() {
  }
}
