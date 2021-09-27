import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { ContactDetails, UpdateDetails } from './model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private apiURL = 'https://localhost:44321/api/addressbook';

  contactList: ContactDetails | any = {};

  contactsUpdate = new EventEmitter<UpdateDetails>();

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  getContacts() {
    this.contactList = this.http.get<ContactDetails>(this.apiURL);
    return this.contactList;
  }

  // tslint:disable-next-line: typedef
  contactsUpdated(data: UpdateDetails) {
    this.contactsUpdate.emit(data);
  }

  // tslint:disable-next-line: typedef
  updateContact(openContact: any, id: any): Observable<ContactDetails> {
    return this.http.put<ContactDetails>(
      `${this.apiURL}/contact/${id}/update`,
      openContact
    );
  }

  // tslint:disable-next-line: typedef
  deleteContact(id: any): Observable<any> {
    return this.http.delete(`${this.apiURL}/contact/${id}/delete`);
  }

  // tslint:disable-next-line: typedef
  getContact(id: any) {
    return this.http.get<ContactDetails>(`${this.apiURL}/contact/${id}`);
  }

  // tslint:disable-next-line: typedef
  pushContact(newEntry: any): Observable<ContactDetails> {
    return this.http.post<ContactDetails>(`${this.apiURL}/add`, newEntry);
  }
}
