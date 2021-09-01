import { Injectable } from '@angular/core';
import { ContactDetails, DEFAULT_LIST } from './model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private restAPIServer = 'https://localhost:44321/api/addressbook';

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: typedef
  loadInitialContact(){
    return `/contact/${DEFAULT_LIST[0].id}`;
  }

  // tslint:disable-next-line: typedef
  getDefaultList(){
    return DEFAULT_LIST;
  }

  // tslint:disable-next-line: typedef
  updateContactList(openContact: any, id: any){
    DEFAULT_LIST[DEFAULT_LIST.findIndex(element => element.id === +id)] = openContact;
  }

  // tslint:disable-next-line: typedef
  fetchContactById(id: any){
    return DEFAULT_LIST[DEFAULT_LIST.findIndex(element => element.id === +id)];
  }

  // tslint:disable-next-line: typedef
  httpFetchContactById(id: any){
    return this.http.get<ContactDetails>(this.restAPIServer + '/contact/' + id);
  }

  // tslint:disable-next-line: typedef
  contactDeletion(id: any){
    DEFAULT_LIST.splice(DEFAULT_LIST.findIndex(element => element.id === +id), 1);
    return `/contact/${DEFAULT_LIST[0].id}`;
  }

  // tslint:disable-next-line: typedef
  fetchSelectedContact(id: any){
    return DEFAULT_LIST.find(element => element.id === +id);
  }

  // tslint:disable-next-line: typedef
  newContactPush(newEntry: any){
    newEntry.id = DEFAULT_LIST.length + 1;
    DEFAULT_LIST.push(newEntry);
  }

  // tslint:disable-next-line: typedef
  navigatingNewContact(){
    return (`/contact/${DEFAULT_LIST[DEFAULT_LIST.length].id}`);
  }
}
