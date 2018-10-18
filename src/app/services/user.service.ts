import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProjects: any;
  private apiUrl = environment.apiUrl + '/users';

  private projectChange: Subject<any> = new Subject();

  projectChange$: Observable<any> = this.projectChange.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

  private setProjects(user?: any) {
    this.userProjects = user.projects
    this.projectChange.next(user.projects);
    return user.projects;
  }

  find(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}`, options)
      .toPromise();  
  }

  findProfile(id): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}/${id}`, options)
      .toPromise()
      .catch(error => {
        this.router.navigate(['/not-found'])
      });
  }

  userCreate(user: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.post(`${this.apiUrl}/user-create`, user, options)
      .toPromise()
  }

  delete(data): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.apiUrl}/${data}` , options)
     .toPromise();
  }
  
  changePassword(data): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.apiUrl}/settings`, data , options)
      .toPromise()
  }

  addProject(data): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.apiUrl}/add-project`, data, options)
      .toPromise()
      .then((user) => this.setProjects(user))
  }

  deleteProject(id): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.delete(`${this.apiUrl}/delete-project/${id}`, options)
      .toPromise()
      .then((user) => this.setProjects(user))
  }
}
