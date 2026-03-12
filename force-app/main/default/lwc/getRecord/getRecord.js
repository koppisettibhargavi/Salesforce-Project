import { LightningElement,api,wire} from 'lwc';
import { getRecord} from 'lightning/uiRecordApi';
import Name_FEILD from '@salesforce/schema/Account.Name';
import Phone_FEILD from '@salesforce/schema/Account.Phone';
import Rating_FEILD from '@salesforce/schema/Account.Rating';
import Field from '@salesforce/schema/AccountHistory.Field';

const FIELDS=['Account.Name','Account.Phone','Account.Rating'];
export default class GetRecord extends LightningElement {
      @api recordId;
      accName;
      accRating;
      accPhone;
      @api AccountRecord;
     @wire(getRecord,{recordId:'$recordId',fields:FIELDS})
     wireAccountdata({data,error}){
        if(data){
            console.log('get',data);
            this.AccountRecord=data;
            this.accName=this.AccountRecord.fields.Name.value;
            this.accPhone=this.AccountRecord.fields.Phone.value;
            this.accRating=this.AccountRecord.fields.Rating.value;

        }
        if(error){
            console.log(error);
        }
     } 
}