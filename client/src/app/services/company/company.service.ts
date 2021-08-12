import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ICompany } from 'src/app/shared/interfaces/company';
import { IEvent } from 'src/app/shared/interfaces/event';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiURL;
@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

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

  editEvent(data: Object, id: string) {
    return this.http.post<IEvent>(`${apiURL}/company/editEvent/${id}`, data, {
      withCredentials: true,
    });
  }

  deleteEvent(id: string, data: Object) {
    return this.http.post<IEvent>(`${apiURL}/company/deleteEvent/${id}`, data, {
      withCredentials: true,
    });
  }

  attendEvent(id: string, data: Object ) {
    return this.http.post<IEvent>(`${apiURL}/company/attendEvent/${id}`, data, {
      withCredentials: true,
    });
  }
  getEvents() {
    return this.http.get<IEvent[]>(`${apiURL}/company/events`, {
      withCredentials: true,
    });
  }

  getEvent(id: string) {
    return this.http.get<IEvent>(`${apiURL}/company/event/${id}`, {
      withCredentials: true,
    });
  }

  getCompany(id: string) {
    return this.http.get<ICompany>(`${apiURL}/company/${id}`, {
      withCredentials: true,
    });
  }
}
