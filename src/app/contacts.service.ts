import { Injectable } from '@angular/core';
import { Console } from 'node:console';
import { ContactDetails, DEFAULT_LIST, PersonDetails } from './model';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactList: PersonDetails | undefined;

  constructor(
    private httpService: RestApiService
  ) { }

  // tslint:disable-next-line: typedef
  loadInitialContact(){
    return `/contact/${DEFAULT_LIST[0].Id}`;
  }

  // tslint:disable-next-line: typedef
  getDefaultList(){
    return this.httpService.getStaticData();
  }

  // tslint:disable-next-line: typedef
  updateContactList(openContact: any, id: any){
    DEFAULT_LIST[DEFAULT_LIST.findIndex(element => element.Id === +id)] = openContact;
  }

  // tslint:disable-next-line: typedef
  fetchContactById(id: any){
    return DEFAULT_LIST[DEFAULT_LIST.findIndex(element => element.Id === +id)];
  }

  // tslint:disable-next-line: typedef
  contactDeletion(id: any){
    console.log(this.httpService.deleteSpecificContact(id).subscribe());
    // DEFAULT_LIST.splice(DEFAULT_LIST.findIndex(element => element.Id === +id), 1);
    return `/contact/${DEFAULT_LIST[0].Id}`;
  }

  // tslint:disable-next-line: typedef
  fetchSelectedContact(id: any){
    return this.httpService.getSpecificContact(id);
  }

  // tslint:disable-next-line: typedef
  newContactPush(newEntry: any){
    newEntry.id = DEFAULT_LIST.length + 1;
    DEFAULT_LIST.push(newEntry);
  }

  // tslint:disable-next-line: typedef
  navigatingNewContact(){
    return (`/contact/${DEFAULT_LIST[DEFAULT_LIST.length].Id}`);
  }
}
