import { LightningElement, wire,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getdatatable from '@salesforce/apex/DataTable.getdataTable';
const COLS= [
    { label: 'StdName', fieldName: 'Name', type: 'url',editable:true },
    { label: 'Industry', fieldName: 'Industry', type: 'text',editable:true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone',editable:true},
    { label:'Email',fieldName:'email__c',type: 'email',editable:true}
];
export default class DataTable extends LightningElement {
    draftvalues=[];
    @api contactrefreshprope;
    @track dataTableData=[];
    @api columns_1=COLS;
    error_s;
    
    @wire (getdatatable) 
    wiredcontacts({result}){
        console.log('result:'+result);
        this.contactrefreshprope=result;
        
        if(result.data){
            this.dataTableData=this.data;
            console.log(this.dataTableData);}
        else if(result.error){
            console.log(this.result.error);
        }
    }
    getmsg(){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Records fetched successfully',
                variant: 'success',
                mode:'sticky'
            })
        );
    }
    

  async savehandler(event){

    // Get draft values (edited rows)
    let records = event.detail.draftValues;

    // Prepare records for update
    let updateRecordsArray = records.map(currItem => {
        let fieldInput = { ...currItem };
        return { fields: fieldInput };
    });

    

    // Call updateRecord for each record
    let updateRecordsArrayPromise = updateRecordsArray.map(currItem =>
        updateRecord(currItem)
    );

    await Promise.all(updateRecordsArrayPromise);
    
    // Clear draft values
    this.draftValues = [];
    // Success toast
    const toastEvent = new ShowToastEvent({
        title: "Success",
        message: "Records Updated Successfully",
        variant: "success"
    });
    this.dispatchEvent(toastEvent);
    await refreshApex(this.contactrefreshprope);
    }
}