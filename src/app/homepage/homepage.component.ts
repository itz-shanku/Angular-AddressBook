import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactsService } from '../contacts.service';
import { EditContactComponent } from '../edit-contact';
import { ContactOperation, UpdateDetails } from '../model';

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
    this.loadContacts(new UpdateDetails({}));

    this.contactServices.contactListUpdate.subscribe((data) =>
      this.loadContacts(data)
    );
  }

  // tslint:disable-next-line: typedef
  openModal() {
    this.modalService.show(EditContactComponent);
  }

  // tslint:disable-next-line: typedef
  loadContact(id: any) {
    this.routing.navigateByUrl(`/contact/${id}`);
  }

  // tslint:disable-next-line: typedef
  loadContacts(data: UpdateDetails) {
    this.contactServices.getContacts().subscribe((listOfContacts: any) => {
      this.contactList = listOfContacts;
      switch (data.operationType) {
        case ContactOperation.ADD:
        case ContactOperation.EDIT:
          this.loadContact(data.id);
          break;
        case ContactOperation.DELETE:
        default:
          this.loadContact(this.contactList[0].id);
          break;
      }
    });
  }
}
