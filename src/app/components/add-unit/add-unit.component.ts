import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {
  @Input() cohort: any;
  feedbackEnabled = false;
  error = null;
  processing = false;
  loading = true;

  newUnit: any = {
    title: '',
    category: '',
    subCategory: '',
    module: '',
    duration: ''
  }
  constructor(
    private router: Router, 
    private unitService: UnitService) { }

  ngOnInit() {
    this.loading = false;
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.unitService.unitCreate(this.newUnit, this.cohort._id)
      .then(() => {
        this.loading = false;
        this.router.navigate([`/cohort`]);
        })
        .catch((err) => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
