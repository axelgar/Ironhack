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
        if (user.role === 'staff') {
          return true;
        } else {
          this.router.navigate(['/cohorts']);
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }

}