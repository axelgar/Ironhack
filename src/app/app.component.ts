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
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.anon = !user;
    });
    
    // if (this.user) {
    //   this.router.navigate(['/cohort'])
    // }
    // else {
    //   this.router.navigate(['/login'])
    // }
  }
  
  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
