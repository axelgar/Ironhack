import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
  
  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }

  scroll = (): void => {
    const body = document.getElementsByTagName('body')[0];
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 35) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  };

}
