import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactsService } from '../contacts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactDetails, ContactName, ContactAddress } from '../model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  id: any;
  isUpdate = false;
  contactEntry = new ContactDetails({
    name: new ContactName({}),
    address: new ContactAddress({}),
  });
  onClose: any;
  contactList: any;
  contactForm: any;

  constructor(
    private modalServices: BsModalService,
    private contactServices: ContactsService,
    private routing: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl(this.contactEntry.name.firstName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(this.contactEntry.name.lastName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.contactEntry.email, [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,7})$'
        ),
      ]),
      mobileNumber: new FormControl(this.contactEntry.mobileNumber, [
        Validators.required,
        Validators.pattern('\\d{10}'),
      ]),
      landlineNumber: new FormControl(this.contactEntry.landlineNumber, [
        Validators.pattern('\\d{10}'),
      ]),
      website: new FormControl(this.contactEntry.websiteURL, [
        Validators.pattern(
          '^((https?|ftp|smtp):\\/\\/)?(www.)[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$'
        ),
      ]),
      addressLine1: new FormControl(this.contactEntry.address.addressLine1),
      addressLine2: new FormControl(this.contactEntry.address.addressLine2),
    });

    this.isUpdate = this.contactEntry.id as any;
    this.id = this.contactEntry.id;
    if (!this.isUpdate) {
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('submission')!.innerHTML = 'Add';
    }
  }

  // tslint:disable-next-line: typedef
  get firstName() {
    return this.contactForm.get('firstName');
  }

  // tslint:disable-next-line: typedef
  get lastName() {
    return this.contactForm.get('lastName');
  }

  // tslint:disable-next-line: typedef
  get email() {
    return this.contactForm.get('email');
  }

  // tslint:disable-next-line: typedef
  get mobileNumber() {
    return this.contactForm.get('mobileNumber');
  }

  // tslint:disable-next-line: typedef
  get landlineNumber() {
    return this.contactForm.get('landlineNumber');
  }

  // tslint:disable-next-line: typedef
  get website() {
    return this.contactForm.get('website');
  }

  // tslint:disable-next-line: typedef
  get addressLine1() {
    return this.contactForm.get('addressLine1');
  }

  // tslint:disable-next-line: typedef
  get addressLine2() {
    return this.contactForm.get('addressLine2');
  }

  // tslint:disable-next-line: typedef
  closeModal() {
    this.modalServices.hide();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    if (!this.isUpdate) {
      this.addNewContact();
      this.isUpdate = true;
      // tslint:disable-next-line: no-non-null-assertion
      document.getElementById('submission')!.innerHTML = 'Update';
    } else {
      this.submitUpdate();
    }
  }

  // tslint:disable-next-line: typedef
  addNewContact() {
    this.contactServices
      .newContactPush(this.contactForm)
      .subscribe((response) => {
        this.contactServices.contactListUpdated(true);
        this.routing.navigateByUrl(`/contact/${response}`);
      });
    this.closeModal();
  }

  // edit
  // tslint:disable-next-line: typedef
  submitUpdate() {
    this.contactServices
      .updateContact(this.contactForm, this.id)
      .subscribe((response) => {
        this.onClose();
        this.contactServices.contactListUpdated(true);
      });
    this.closeModal();
  }
}
