import { LightningElement,wire} from 'lwc';
import getContacts from '@salesforce/apex/Contactsender.getContacts'
export default class Contactview extends LightningElement {
    contact;
    error;
    @wire(getContacts)
    wiredcontacts({data,error}){
       if(data){
         this.contact=data;
       }
       else if(error){
          this.error=error;
       }
    }

    
}