import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common'


import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users: Array<any> = [];
  error = false;
  currentLocation = location.pathname;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.find()
      .then((results) => {
        this.users = results;
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
  }
}