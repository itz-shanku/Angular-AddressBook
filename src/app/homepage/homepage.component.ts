import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditContactComponent } from '../edit-contact';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private contactServices: ContactsService,
    private routing: Router
    ) { }

  contactList: any;
  id: any;

  ngOnInit(): void {
    this.contactServices.getDefaultList().subscribe((listOfContacts: any) => {
      this.contactList = listOfContacts;
    });
    this.loadFirstContact();
  }

  // tslint:disable-next-line: typedef
  openModal(){
    this.modalService.show(EditContactComponent);
  }

  // tslint:disable-next-line: typedef
  loadFirstContact(){
    this.routing.navigateByUrl(this.contactServices.loadInitialContact());
  }
}
