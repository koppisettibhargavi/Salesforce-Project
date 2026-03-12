import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";
import FIELD_NAME from '@salesforce/schema/Account.Name';
import FIELD_PHONE from '@salesforce/schema/Account.Phone';
export default class RecordForm extends LightningElement {
    fieldobject={
        Name:FIELD_NAME,
        Phone:FIELD_PHONE
    }

    @api recordId;
    @api objectApiName;
    handleSuccessevent(event) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account updated successfully',
                    variant: 'success'
                })
            );
        }

        handleErrorevent(event) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Some Thing Went Wrong',
                    variant: 'error'
                })
            );
        }
    
    navigateToRecordPage(event){
     let accountHomePageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "view",
      },
      } 
      this[NavigationMixin.Navigate](accountHomePageRef);
    }
}