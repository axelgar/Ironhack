import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequireStaffGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<any> {
    return this.authService.me()
      .then((user) => {
        if (user) {
          if (user.role === 'staff' || user.role === 'teacher' || user.role === 'ta' || user.role === 'admin') {
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