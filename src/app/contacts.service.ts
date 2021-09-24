import { Injectable } from '@angular/core';
import { ContactDetails, PersonDetails } from './model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiURL = 'https://localhost:44321/api/addressbook';

  contactList: ContactDetails | any = ({});
  firstContactId: any;
  lastContactId: any;

  

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: typedef
  loadInitialContact() {
    this.firstContactId = this.contactList[0].id;
    return `/contact/${this.firstContactId}`;
  }

  // tslint:disable-next-line: typedef
  getDefaultList(){
    this.contactList = this.http.get<ContactDetails>(this.apiURL);
    return this.contactList;
  }

  // tslint:disable-next-line: typedef
  updateContact(openContact: any, id: any): Observable<PersonDetails>{
    return this.http.put<ContactDetails>(this.apiURL + `/contact/${id}/update`, openContact);
  }

  // tslint:disable-next-line: typedef
  deleteContact(id: any): Observable<unknown>{
    return this.http.delete(this.apiURL + `/contact/${id}/delete`);
  }

  // tslint:disable-next-line: typedef
  fetchContact(id: any){
    return this.http.get<ContactDetails>(this.apiURL + `/contact/${id}`);
  }

  // tslint:disable-next-line: typedef
  newContactPush(newEntry: any): Observable<PersonDetails>{
    return this.http.post<ContactDetails>(this.apiURL + '/add', newEntry);
  }

  // tslint:disable-next-line: typedef
  navigatingNewContact(){
    this.lastContactId = this.contactList[this.contactList.lenght - 1].Id;
    return `/contact/${this.lastContactId}`;
  }
}
