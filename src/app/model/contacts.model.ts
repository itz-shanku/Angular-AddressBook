export interface PersonDetails {
    id: number;
    email: string;
    mobileNumber: string;
    landlineNumber: string;
    websiteURL: string;
}

export class ContactName {
    firstName: string;
    lastName: string;

    constructor(newName: any) {
        this.firstName = newName.firstName;
        this.lastName = newName.lastName;
    }
}

export class ContactAddress {
    addressLine1: string;
    addressLine2: string;

    constructor(newAddress: any) {
        this.addressLine1 = newAddress.addressLine1;
        this.addressLine2 = newAddress.addressLine2;
    }
}

export class ContactDetails implements PersonDetails {
    id: number;
    name: ContactName;
    email: string;
    mobileNumber: string;
    landlineNumber: string;
    websiteURL: string;
    address: ContactAddress;

    constructor(newContact: any) {
        this.id = newContact.id;
        this.name = newContact.name;
        this.email = newContact.email;
        this.mobileNumber = newContact.mobileNumber;
        this.landlineNumber = newContact.landlineNumber;
        this.websiteURL = newContact.websiteURL;
        this.address = newContact.address;
    }
}
