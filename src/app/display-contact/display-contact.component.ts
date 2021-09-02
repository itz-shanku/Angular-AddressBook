import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditContactComponent } from '../edit-contact';
import { ContactDetails } from '../model';

@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html'
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
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      // tslint:disable-next-line: no-shadowed-variable
      this.contactServices.fetchSelectedContact(this.id).subscribe((specificContact: any) => {
        this.selectedContact = specificContact;
      }); });
  }

  // tslint:disable-next-line: typedef
  deleteContact(){
    this.routing.navigateByUrl(this.contactServices.contactDeletion(this.id));
  }

  // tslint:disable-next-line: typedef
  openModal(){
    this.initialState = {
      contactEntry : new ContactDetails(this.selectedContact),
      onClose: () => {
        this.selectedContact = this.contactServices.fetchSelectedContact(this.id);
      }
    };
    this.editContact();
  }

  // tslint:disable-next-line: typedef
  editContact(){
    this.modalService.show(EditContactComponent, {initialState: this.initialState});
  }
}
