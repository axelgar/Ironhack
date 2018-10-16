import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit {
  user: any;
  id: string;
  feedbackEnabled = false;
  error = null;
  processing = false;
  uploader: FileUploader;
  loading = true;
  fileFeedback = false;
  currentUser: any;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.userService.findProfile(this.currentUser._id)
      .then((result) => {
        this.user = result;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
      this.uploader= new FileUploader({
        url: environment.apiUrl + `/users/edit`
      });
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    const filesSelected = this.uploader.getNotUploadedItems();
    if (!filesSelected.length) {
      this.fileFeedback = true;
    }
    if (form.valid && filesSelected.length) {
      this.uploader.onBuildItemForm = (item, form2) => {
        form2.append('firstName', this.user.firstName);
        form2.append('lastName', this.user.lastName);
        form2.append('description', this.user.description);
      };
      this.uploader.onSuccessItem = (item, response) => {
        this.router.navigate([`/user/${this.user._id}`]);
      };

      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.error = JSON.parse(response).code;
        this.processing = false;
        this.feedbackEnabled = false;
      };
      this.uploader.uploadAll();
      this.processing = true;

    }
  }

}
