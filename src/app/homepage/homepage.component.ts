import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactsService } from '../contacts.service';
import { EditContactComponent } from '../edit-contact';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private contactServices: ContactsService,
    private routing: Router
  ) {}

  contactList: any;
  id: any;

  ngOnInit(): void {
    this.loadContactList();

    this.contactServices.emitter.subscribe((data) => {
      if (data === true) { this.loadContactList(); }
    });
  }

  // tslint:disable-next-line: typedef
  openModal() {
    this.modalService.show(EditContactComponent);
  }

  // tslint:disable-next-line: typedef
  loadFirstContact(id: any) {
    this.routing.navigateByUrl(`/contact/${id}`);
  }

  // tslint:disable-next-line: typedef
  loadContactList() {
    this.contactServices.getDefaultList().subscribe((listOfContacts: any) => {
      this.contactList = listOfContacts;
      this.loadFirstContact(this.contactList[0].id);
    });
  }
}
