import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrls: ['./profile-settings-page.component.scss']
})
export class ProfileSettingsPageComponent implements OnInit {
  feedbackEnabled = false;
  error = null;
  processing = false;
  id: string;
  user:any;
  passwords: any = {
    newPassword: '',
    currentPassword: ''
  }

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.userService.findProfile(this.id)
          .then((result) => {
            this.user = result;
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
          })
      })
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.userService.changePassword(this.passwords, this.user._id)
        .then((user) => {
          this.router.navigate([`/user/${this.user._id}`]);
        })
        .catch((err) => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}