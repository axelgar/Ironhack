import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  loading = true;
  anon: boolean;
  user: any;
  currentUser: any;
  error = false;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.anon = !user;
      return this.currentUser=this.authService.getUser()
    });
  }
  
  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
