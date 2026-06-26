import { LightningElement,api} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
export default class FlowWithLwc extends LightningElement {

   @api recordId;

    inputVariables = [
        {
            name: 'AccName',
            type: 'String',
            value: 'Tech Journey Account'
        }
    ];

    handleStatusChange(event) {

        if (event.detail.status === 'FINISHED') {

            const outputVariables = event.detail.outputVariables;
            console.log('outputVariables',JSON.stringify(outputVariables));
            outputVariables.forEach(item => {

                console.log('Variable Name : ', item.name);
                console.log('Variable Value : ', item.value);
            });
        }
    }

    

}