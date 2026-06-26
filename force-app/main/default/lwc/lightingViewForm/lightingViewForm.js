import { LightningElement,api } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Contact.Name";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";

export default class LightingViewForm extends LightningElement {
    nameField = NAME_FIELD;
    mobile=EMAIL_FIELD;
    phone=PHONE_FIELD;

    @api recordId;
    @api objectApiName;
    
}