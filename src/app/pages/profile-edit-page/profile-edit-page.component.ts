import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

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
  
  newUser: any = {
    firstName: '',
    lastName: '',
    description: ''
  }

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router) { }

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
  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/users/edit/${this.id}`
  });

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.uploader.onBuildItemForm = (item, form2) => {
        form2.append('newUser', this.newUser);
      };
    }
    this.uploader.uploadAll();
    // this.router.navigate([`/user/${this.user._id}`]);


    
    // if (form.valid) {
    //   this.processing = true;
    //   this.userService.userCreate(this.newUser)
    //     .then((id) => {
    //       this.router.navigate([`/user/${id}`]);
    //     })
    //     .catch((err) => {
    //       this.error = err.error.code;
    //       this.processing = false;
    //       this.feedbackEnabled = false;
    //     });
    // }
    // if (form.valid) {
    //   this.uploader.onBuildItemForm = (item, form2) => {
    //     form2.append('name', this.name);
    //   };
    // }
    // this.uploader.uploadAll();
  // }
  }

}
