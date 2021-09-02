import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonDetails } from './model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private restAPIServer = 'https://localhost:44321/';

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: typedef
  getStaticData() {
    return this.http.get<PersonDetails>(this.restAPIServer + 'api/addressbook');
  }

  // tslint:disable-next-line: typedef
  getSpecificContact(id: any) {
    return this.http.get<PersonDetails>(this.restAPIServer + `contact/${id}`);
  }

  deleteSpecificContact(id: any): Observable<unknown> {
    return this.http.delete(this.restAPIServer + `contact/${id}`);
  }

}
