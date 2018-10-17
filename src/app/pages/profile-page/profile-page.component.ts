import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any;
  id: string;
  error = false;
  currentUser: any;
  module: any='';
  newProject = {
    title: '',
    presLink: '',
    module: '',
    deployLink:''
  } ;

  feedbackEnabled = false;
  projecterror = null;
  loading = true;
  processing = false;
  projectsUser: Array<any> = [];


  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userService.projectChange$.subscribe((projects) => {
      this.projectsUser = projects;
    })
    this.route.params
      .subscribe((params) => {
        this.id = params.id;
        this.userService.findProfile(this.id)
          .then((result) => {
            this.user = result;
            this.projectsUser = this.user.projects;
            return this.authService.getUser()
          })
          .then((result) => {
            this.loading = false;
            return this.currentUser = result;
          })
          .catch((error) => {
            console.log(error);
            this.error = true;
          })
      })
  }

  submitForm(form) {
    this.projecterror = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.loading = true;
      this.userService.addProject(this.newProject)
        .then(() => {
          this.loading = false;
          this.processing= false;
          console.log(this.id)
          this.router.navigate([`/user/${this.id}`])
          this.feedbackEnabled = false;
          this.newProject = {
            title: '',
            presLink: '',
            module: '',
            deployLink: ''
          };
        })
        .catch((err) => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

  handleDeleteProject(id) {
    this.userService.deleteProject(id)
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
  }



}
