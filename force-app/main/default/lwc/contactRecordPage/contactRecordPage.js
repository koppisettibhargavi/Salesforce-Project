import { LightningElement,api,track,wire } from 'lwc';
import getContactsByProfilefields from '@salesforce/apex/differentoptionsforusers.getContactsByProfilefields';
export default class ContactRecordPage extends LightningElement {
    @api recordId;
    @api objectApiName;
    keyword='ram';
    @track fields = [];
    
    @wire(getContactsByProfilefields ,{ keywordval: '$keyword'})
    wiredFields({ data, error }) {
            
        if (data) {
                
                 this.fields = data.fields.split(',').map(f => f.trim()).filter(f => f !== 'Id');
                //this.fields = data.split(',').map(f => `${this.objectApiName}.${f.trim()}`).filter(f => f !== 'Id');
                //this.fields = data.split(',').map(f => `Account.${f.trim()}`).filter(f => f !== 'Account.Id');
                console.log("fields",JSON.stringify(data.fields));
        }
            
        else if(error){
                console.log(error);
        }
    }
    

}