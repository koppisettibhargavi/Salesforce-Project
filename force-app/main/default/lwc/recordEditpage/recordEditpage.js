import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";
export default class RecordEditpage extends LightningElement {
    @api recordId;        // auto from record page
    @api objectApiName;

    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Account updated successfully',
                variant: 'success'
            })
        ); 
    }
    
    handleError(event){
        console.log("error");
    }
    
    navigateToRecordPage(event){
     let accountPage = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "view",
      },
      } 
      this[NavigationMixin.Navigate](accounPage);
    }

    clickHandler(){
        let inputFileds=this.template.querySelectorAll("lighting-input-field");
        inputFileds.forEach((inputfiled)=> inputFiled.reset());
    }

    submitHandler(event){
        event.preventDefault();
        console.log(event.detail);
        console.log(JSON.stringify(event.detail.fields))
        const fields=event.deatil.fields;
        if(!fields.Rating){
            fields.Rating="Hot";
        }
        this.template.querySelectorAll("lighting-record-edit-form").submit(fields);
    }
}