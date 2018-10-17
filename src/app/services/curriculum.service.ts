import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private apiUrl = environment.apiUrl + '/curriculum';

  constructor(private httpClient: HttpClient, private router: Router) { }

  list(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}`, options)
      .toPromise();
  }

  getOne(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.apiUrl}/${id}`, options)
      .toPromise()
      .catch(error => {
        this.router.navigate(['/not-found'])
      });
      
  }
}
