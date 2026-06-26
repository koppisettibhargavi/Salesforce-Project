import { LightningElement, track,api } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class RecordFormdataServices extends LightningElement {
    @track fieldsdata=['Name','AnnualRevenue','Industry'];
    @track fieldsdatafromschema=[NAME_FIELD,REVENUE_FIELD,INDUSTRY_FIELD];
    @api recordId;
    @api objectApiName;
}