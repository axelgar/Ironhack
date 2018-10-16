import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from "@angular/router";
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  feedback: string;
  user: any;
  id: string;
  error = false;
  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/users/${this.id}`
  });

  constructor(private userService: UserService, private route: ActivatedRoute) { }

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
        this.uploader.onSuccessItem = (item, response) => {
          this.userService.findProfile(this.id)
            .then((result) => {
              this.user = result;
            });
        };

        this.uploader.onErrorItem = (item, response, status, headers) => {
          this.feedback = JSON.parse(response).message;
        };
      })
    
  }

}
