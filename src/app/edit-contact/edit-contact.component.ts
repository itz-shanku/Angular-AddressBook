import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactDetails } from '../model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html'
})
export class EditContactComponent implements OnInit {

  id: any;
  isUpdate = false;
  contactEntry =  new ContactDetails({});
  onClose: any;

  constructor(
    private modalServices: BsModalService,
    private contactServices: ContactsService,
    private routing: Router
  ) { }

  ngOnInit(): void {
    this.isUpdate = this.contactEntry.id as any;
    this.id = this.contactEntry.id;
    if (!(this.isUpdate)){
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('submission')!.innerHTML = 'Add';
    }
  }

  // tslint:disable-next-line: typedef
  closeModal(){
    this.modalServices.hide();
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    if (!(this.isUpdate)){
      this.addNewContact();
      this.isUpdate = true;
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('submission')!.innerHTML = 'Update';
    }
    else{
      this.submitUpdate();
    }
  }

  // tslint:disable-next-line: typedef
  addNewContact(){
    this.contactServices.newContactPush(this.contactEntry);
    this.closeModal();
    this.routing.navigateByUrl(this.contactServices.navigatingNewContact());
  }

  // tslint:disable-next-line: typedef
  submitUpdate(){
    this.contactServices.updateContactList(this.contactEntry, this.id);
    this.closeModal();
    this.onClose();
  }
}
