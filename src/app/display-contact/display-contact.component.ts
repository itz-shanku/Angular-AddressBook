import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactsService } from '../contacts.service';
import { EditContactComponent } from '../edit-contact';
import { ActivatedRoute } from '@angular/router';
import { ContactDetails, ContactOperation } from '../model';

@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
})
export class DisplayContactComponent implements OnInit {
  selectedContact: any;
  id: any;
  initialState: any;

  constructor(
    private route: ActivatedRoute,
    private contactServices: ContactsService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      // tslint:disable-next-line: no-shadowed-variable
      this.contactServices
        .getContact(this.id)
        .subscribe((specificContact: any) => {
          this.selectedContact = specificContact;
        });
    });
  }

  // tslint:disable-next-line: typedef
  deleteContact() {
    this.contactServices.deleteContact(this.id).subscribe((result) =>
      this.contactServices.contactsUpdated({
        operationType: ContactOperation.DELETE,
        id: null,
      })
    );
  }

  // tslint:disable-next-line: typedef
  openModal() {
    this.initialState = {
      contactEntry: new ContactDetails(this.selectedContact),
      onClose: () => {
        this.contactServices
          .getContact(this.id)
          .subscribe((specificContact: any) => {
            this.selectedContact = specificContact;
          });
      },
    };
    this.editContact();
  }

  // tslint:disable-next-line: typedef
  editContact() {
    this.modalService.show(EditContactComponent, {
      initialState: this.initialState,
    });
  }
}
