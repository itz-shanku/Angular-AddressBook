import { Injectable } from '@angular/core';
import { DEFAULT_LIST, PersonDetails } from './model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiURL = 'https://localhost:44321/api/addressbook';

  contactList: PersonDetails | undefined;
  firstContactId: any;
  lastContactId: any;

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: typedef
  loadInitialContact(){
    this.firstContactId = this.http.get<any>(this.apiURL + '/contact/first');
    return `/contact/${this.firstContactId}`;
  }

  // tslint:disable-next-line: typedef
  getDefaultList(){
    return this.http.get<PersonDetails>(this.apiURL);
  }

  // tslint:disable-next-line: typedef
  updateContactList(openContact: any, id: any): Observable<PersonDetails>{
    return this.http.put<PersonDetails>(this.apiURL + `/contact/${id}/update`, id);
    // DEFAULT_LIST[DEFAULT_LIST.findIndex(element => element.Id === +id)] = openContact;
  }

  // tslint:disable-next-line: typedef
  deleteSpecificContact(id: any): Observable<unknown>{
    return this.http.delete(this.apiURL + `/contact/${id}/delete`);
  }

  // tslint:disable-next-line: typedef
  fetchSelectedContact(id: any){
    return this.http.get<PersonDetails>(this.apiURL + `/contact/${id}`);
  }

  // tslint:disable-next-line: typedef
  newContactPush(newEntry: any): Observable<PersonDetails>{
    return this.http.post<PersonDetails>(this.apiURL + '/add', newEntry);
  }

  // tslint:disable-next-line: typedef
  navigatingNewContact(){
    this.lastContactId = this.http.get<any>(this.apiURL + '/contact/last');
    return `/contact/${this.lastContactId}`;
  }
}
