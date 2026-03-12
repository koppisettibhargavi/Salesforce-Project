import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
export default class CreateRecord extends LightningElement {
    
    createAcc() {
        const fields = {
            Name: 'Test Account',
            Industry: 'Banking',
            Phone: '9999999999'
        };

        const recordInput = {
            apiName: 'Account',
            fields: fields
        };

        createRecord(recordInput)
            .then(result => {
                console.log('Created Id:', result.id);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }
}