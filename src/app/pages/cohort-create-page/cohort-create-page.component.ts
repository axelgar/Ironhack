import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CohortService } from '../../services/cohort.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cohort-create-page',
  templateUrl: './cohort-create-page.component.html',
  styleUrls: ['./cohort-create-page.component.scss']
})
export class CohortCreatePageComponent implements OnInit {
  feedbackEnabled = false;
  error = null;
  processing = false;
  tas: Array<any>;
  teachers: Array<any>;
  students: Array<any>;
  users: Array<any>;

  newCohort: any = {
    location: '',
    type: '',
    startDate: '',
    language: '',
    teacher: ''
  }

  constructor(private cohortService: CohortService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.find()
      .then((results) => {
        this.users = results;
        this.teachers = this.users.filter(user => {
          return user.role === 'teacher'
        });
        this.tas = results.filter(user => {
          return user.role === 'ta'
        });
        this.students = results.filter(user => {
          return user.role === 'student'
        });
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.cohortService.create(this.newCohort)
        .then((cohort) => {
          const id = cohort._id;
          this.router.navigate([`/cohort/${id}`]);
        })
        .catch((err) => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}

