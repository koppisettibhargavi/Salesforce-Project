import { LightningElement, api, wire } from 'lwc';
import getFilteredValues from '@salesforce/apex/differentoptionsforusers.getFilteredValues';
import updateOpportunity from '@salesforce/apex/differentoptionsforusers.updateOpportunity';

export default class ProfileBasedOptions extends LightningElement {
    @api recordId;

    statusOptions = [];
    selectedStatus;
    amount;
    stage;
    closeDate;

    @wire(getFilteredValues)
    wiredValues({ data }) {
        if (data) {
            this.statusOptions = data.map(val => ({
                label: val,
                value: val
            }));
        }
    }

    handleStatusChange(event) {
        this.selectedStatus = event.detail.value;
    }

    handleAmountChange(event) {
        this.amount = event.target.value;
    }

    handleStageChange(event) {
        this.stage = event.target.value;
    }

    handleDateChange(event) {
        this.closeDate = event.target.value;
    }

    handleSave() {
        updateOpportunity({
            recordId: this.recordId,
            statusValue: this.selectedStatus,
            amount: this.amount,
            stage: this.stage,
            closeDate: this.closeDate
        })
        .then(() => {
            console.log('Record Updated');
        })
        .catch(error => {
            console.error(error);
        });
    }
}