import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ContactsService } from '../contacts.service';
import { ContactDetails, ContactOperation } from '../model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  isUpdate = false;
  contactEntry = new ContactDetails({});
  onClose: any;
  contactForm: any;

  constructor(
    private modalServices: BsModalService,
    private contactServices: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      id: new FormControl(this.contactEntry.id),
      name: new FormGroup({
        firstName: new FormControl(this.contactEntry.name.firstName, [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl(this.contactEntry.name.lastName, [
          Validators.required,
          Validators.minLength(3),
        ]),
      }),
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
      websiteURL: new FormControl(this.contactEntry.websiteURL, [
        Validators.pattern(
          '^((https?|ftp|smtp):\\/\\/)?(www.)[a-z0-9]+\\.[a-z]+(\\/[a-zA-Z0-9#]+\\/?)*$'
        ),
      ]),
      address: new FormGroup({
        addressLine1: new FormControl(this.contactEntry.address.addressLine1),
        addressLine2: new FormControl(this.contactEntry.address.addressLine2),
      }),
    });

    this.isUpdate = this.contactEntry.id as any;
    this.contactForm.id = this.contactEntry.id;
  }

  // tslint:disable-next-line: typedef
  get firstName() {
    return this.contactForm.get(['name', 'firstName']);
  }

  // tslint:disable-next-line: typedef
  get lastName() {
    return this.contactForm.get(['name', 'lastName']);
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
  get websiteURL() {
    return this.contactForm.get('websiteURL');
  }

  // tslint:disable-next-line: typedef
  get addressLine1() {
    return this.contactForm.get(['address', 'addressLine1']);
  }

  // tslint:disable-next-line: typedef
  get addressLine2() {
    return this.contactForm.get(['address', 'addressLine2']);
  }

  // tslint:disable-next-line: typedef
  closeModal() {
    this.modalServices.hide();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    if (!this.isUpdate) {
      this.addContact();
      this.isUpdate = true;
    } else {
      this.updateContact();
    }
  }

  // tslint:disable-next-line: typedef
  addContact() {
    this.contactServices
      .pushContact(this.contactForm.value)
      .subscribe((response) => {
        this.contactServices.contactsUpdated({
          operationType: ContactOperation.ADD,
          id: response,
        });
      });
    this.closeModal();
  }

  // tslint:disable-next-line: typedef
  updateContact() {
    this.contactServices
      .updateContact(this.contactForm.value, this.contactForm.id)
      .subscribe(() => {
        this.onClose();
        this.contactServices.contactsUpdated({
          operationType: ContactOperation.EDIT,
          id: this.contactForm.id,
        });
      });
    this.closeModal();
  }
}
