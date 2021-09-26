import { ContactDetails } from '../model';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactsService } from '../contacts.service';
import { EditContactComponent } from '../edit-contact';
import { ActivatedRoute, Router } from '@angular/router';

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
    private modalService: BsModalService,
    private routing: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      // tslint:disable-next-line: no-shadowed-variable
      this.contactServices
        .fetchContact(this.id)
        .subscribe((specificContact: any) => {
          this.selectedContact = specificContact;
        });
    });
  }

  // tslint:disable-next-line: typedef
  deleteContact() {
    this.contactServices
      .deleteContact(this.id)
      .subscribe((result) => this.contactServices.contactListUpdated(true));
  }

  // tslint:disable-next-line: typedef
  openModal() {
    this.initialState = {
      contactEntry: new ContactDetails(this.selectedContact),
      onClose: () => {
        this.contactServices
          .fetchContact(this.id)
          .subscribe((specificContact: any) => {
            this.selectedContact = specificContact;
            this.routing.navigateByUrl(`/contact/${this.selectedContact.id}`);
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
