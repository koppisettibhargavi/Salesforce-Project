import { LightningElement, api, wire } from 'lwc';
import getAccount from '@salesforce/apex/Controllerfun.getAccount';
import updateAccount from '@salesforce/apex/Controllerfun.updateAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountEditForm extends LightningElement {

    //@api recordId;

    //@api objectApiName;
    name = '';
    phone = '';
    industry = '';

    industryOptions = [
        { label: 'Banking', value: 'Banking' },
        { label: 'IT', value: 'IT' },
        { label: 'Healthcare', value: 'Healthcare' }
    ];

    // 🔹 Load existing record
    @wire(getAccount, { recordId: '$recordId' })
    accountHandler({ data, error }) {
        if (data) {
            this.name = data.Name;
            this.phone = data.Phone;
            this.industry = data.Industry;
        } else if (error) {
            console.error(error);
        }
    }

    handleName(event) {
        this.name = event.target.value;
    }

    handlePhone(event) {
        this.phone = event.target.value;
    }

    handleIndustry(event) {
        this.industry = event.target.value;
    }

    handleUpdate() {

        updateAccount({
            recordId: this.recordId,
            name: this.name,
            phone: this.phone,
            industry: this.industry
        })
        .then(() => {
            this.showToast('Success', 'Account Updated', 'success');
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }
}