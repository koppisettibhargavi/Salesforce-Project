import { LightningElement, api } from 'lwc';
import FIELD_NAME from '@salesforce/schema/Account.Name';
import FIELD_PHONE from '@salesforce/schema/Account.Phone';
import { getRecord } from 'lightning/uiRecordApi';
export default class RecordView extends LightningElement {
    @api recordId;        // auto from record page
    @api objectApiName;   // auto from record page
    fieldobject={
            Name:FIELD_NAME,
            Phone:FIELD_PHONE
        }

}