import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

// import { CohortService } from '../../services/cohort.service';



@Component({
  selector: 'app-users-create-page',
  templateUrl: './users-create-page.component.html',
  styleUrls: ['./users-create-page.component.scss']
})
export class UsersCreatePageComponent implements OnInit {
  feedbackEnabled = false;
  error = null;
  processing = false;
  id: string;

  newUser: any = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    cohortId: this.route.params
  }

  constructor(
    private userService: UserService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.userService.userCreate(this.newUser)
      .then((cohort) => {
        this.router.navigate([`/cohort/${cohort}`]);
        })
        .catch((err) => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}

