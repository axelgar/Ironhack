import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrls: ['./profile-settings-page.component.scss']
})
export class ProfileSettingsPageComponent implements OnInit {
  feedbackEnabled = false;
  error = null;
  processing = false;
  loading = true;
  id: string;
  user:any;
  passwords: any = {
    newPassword: '',
    currentPassword: ''
  }
  currentUser: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
  
  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.userService.findProfile(this.currentUser._id)
      .then((result) => {
        this.loading = false;
        this.user = result;
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
      this.loading = true;
      this.userService.changePassword(this.passwords)
        .then((user) => {
          this.loading = false;
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