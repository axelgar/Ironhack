import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
export class LogInPageComponent implements OnInit {

  feedbackEnabled = false;
  error = null;
  processing = false;

  login: any = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.authService.login(this.login)
        .then(() => {
          this.router.navigate(['/cohort']);
        })
        .catch((err) => {
          this.error = err.error.code || 'unexpected'
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }
}
