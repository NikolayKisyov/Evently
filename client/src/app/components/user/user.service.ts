import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces/user';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiURL;
@Injectable()
export class UserService {
  user: IUser | null | undefined = undefined;

  constructor(
    private http: HttpClient
  ) { }

  register(data: Object) {
    return this.http.post<IUser>(`${apiURL}/auth/register`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    );
  }

  login(data: Object) {
    return this.http.post<IUser>(`${apiURL}/auth/login`, data, { withCredentials: true }).pipe(
      tap((user) => this.user = user)
    );
  }

  logout() {
    return this.http.post<IUser>(`${apiURL}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.user = null)
    );
  }
}
