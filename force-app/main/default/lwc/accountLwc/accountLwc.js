import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountReturn.getAccounts';
export default class AccountLwc extends LightningElement {
    accounts;
    error;
    @wire(getAccounts)
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }
}