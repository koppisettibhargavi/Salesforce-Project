import { LightningElement,track,wire} from 'lwc';
import getAccount from '@salesforce/apex/Datableclass.getAccount'
import Field from '@salesforce/schema/AccountHistory.Field';
import { updateRecord } from 'lightning/uiRecordApi';
import{ShowToastEvent} from  'lightning/platformShowToastEvent';
import {refreshApex} from    '@salesforce/apex';

export default class InLineEditingDatatable extends LightningElement {
    @track colscol= [
        { label: 'Account Name', fieldName: 'Name', type: 'text',editable:true},
        { label: 'Industry', fieldName: 'Industry', type: 'text',editable: true},
        { label: 'Phone', fieldName: 'Phone', type: 'phone',editable: true},
        { label:'Rating',fieldName:'Rating',type: 'text',editable: true}
       ];

    @track datalist=[];
    @track savedDrafValues=[];
    @track refreshdatalist=[];
    @wire(getAccount)
    wiredAccounts(result){
       this.refreshdatalist=result;
       console.log("refreshdatalist",JSON.stringify(this.refreshdatalist));
       
       const{data,error}=result;
       if(data){
         this.datalist=data;
       }
       else if(error){
        console.log(error.body.message);
      }
    }
    
    handlesave(event){
       this.savedDrafValues=event.detail.draftValues;
       console.log("savedDrafValues",JSON.stringify(this.savedDrafValues));
       const recordInput=this.savedDrafValues.slice()
       .map(row => {
          const fieldupdate={...row};
          console.log('fileds',JSON.stringify(fieldupdate));
          return {fields:fieldupdate}
       });
       console.log(recordInput);
       const promiseUpdate=recordInput.map(row=>updateRecord(row));
       Promise.all(promiseUpdate).then((result)=>{
        const eve=new ShowToastEvent({
                        title: 'Success',
                        message: 'Account saved successfully',
                        variant: 'success'
                    })
        this.dispatchEvent(eve);
        return refreshApex(this.refreshdatalist);
       })
       .catch(error=>{
           const eveerr=new ShowToastEvent({
                        title: 'Success',
                        message: 'error',
                        variant: 'success'
                    })
        this.dispatchEvent(eveerr);
       })
       .finally(()=>{
           this.savedDrafValues=[];
       })
    }
    

}