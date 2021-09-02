export interface PersonDetails {
    Id: number;
    ContactName: string;
    Email: string;
    MobileNumber: string;
    LandlineNumber: string;
    WebsiteURL: string;
    ContactAddress: string;
}

export class ContactDetails implements PersonDetails {
    Id: number;
    ContactName: string;
    Email: string;
    MobileNumber: string;
    LandlineNumber: string;
    WebsiteURL: string;
    ContactAddress: string;

    constructor(newContact: any) {
        this.Id = newContact.id;
        this.ContactName = newContact.name;
        this.Email = newContact.email;
        this.MobileNumber = newContact.mobile;
        this.LandlineNumber = newContact.landline;
        this.WebsiteURL = newContact.website;
        this.ContactAddress = newContact.address;
    }
}
