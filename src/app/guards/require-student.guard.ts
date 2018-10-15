import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequireStudentGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<any> {
    return this.authService.me()
      .then((user) => {
        if (user) {
          if (user.role === 'student') {
            return true;
          }
          else {
            this.router.navigate(['/cohorts']);
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }

}
