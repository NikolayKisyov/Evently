import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/components/user/user.service';
import { ICompany } from 'src/app/shared/interfaces/company';
import { IEvent } from 'src/app/shared/interfaces/event';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiURL;
@Injectable()
export class CompanyService {
  constructor(private userService: UserService, private http: HttpClient) {}

  createCompany(data: Object) {
    return this.http.post<ICompany>(`${apiURL}/company/createCompany`, data, {
      withCredentials: true,
    });
  }

  createEvent(data: Object) {
    return this.http.post<IEvent>(`${apiURL}/company/createEvent`, data, {
      withCredentials: true,
    });
  }
}
