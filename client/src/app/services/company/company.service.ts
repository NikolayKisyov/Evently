import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/components/user/user.service';
import { ICompany } from 'src/app/shared/interfaces/company';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiURL;
@Injectable()
export class CompanyService {
  constructor(private userService: UserService, private http: HttpClient) {}

  create(data: Object) {
    const userId = this.userService.user?._id;
    return this.http.post<ICompany>(`${apiURL}/company/create`, data, {
      withCredentials: true,
    });
  }
}
