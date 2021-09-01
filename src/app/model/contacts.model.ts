export interface PersonDetails {
    id: number;
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;
}

export class ContactDetails implements PersonDetails {
    id: number;
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;

    constructor(newContact: any) {
        this.id = newContact.id;
        this.name = newContact.name;
        this.email = newContact.email;
        this.mobile = newContact.mobile;
        this.landline = newContact.landline;
        this.website = newContact.website;
        this.address = newContact.address;
    }
}
