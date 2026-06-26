import { LightningElement } from 'lwc';
import testConnection from '@salesforce/apex/OracleCPQIntegration.testConnection';
export default class School extends LightningElement {

    //cpqUrl ='https://gcctraining-xerox.bigmachines.com';
    
    responseBody;
   
    handleClick() {

        testConnection()
            .then(result => {
                this.responseBody = result;
                console.log('Response:', result);
            })
            .catch(error => {
                console.error(error);
            });
    }
}