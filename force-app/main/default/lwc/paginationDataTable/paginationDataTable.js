import { LightningElement,track,api,wire} from 'lwc';
import getAccountsKeyset from '@salesforce/apex/paginationclass.getAccountsKeyset';
import getAccountsByProfile from '@salesforce/apex/Controllerfun.getAccountsByProfile';
import {refreshApex} from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import{ShowToastEvent} from  'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";
import Name from '@salesforce/schema/Account.Name';
import { publish, MessageContext,subscribe } from 'lightning/messageService';
import MY_CHANNEL from '@salesforce/messageChannel/MyMessageChannelTwo__c';
export default class PaginationDataTable extends NavigationMixin(LightningElement) {
    
   /*@track colscol= [
    { label: 's.no', fieldName: 'rowNum',},
    { label: 'Account Name', fieldName: 'Nameurl', type: 'url',
        typeAttributes:{
            label:{fieldName: 'Name'},
            target:'_blank',
        },editable:true
    },
    { label: 'Industry', fieldName: 'Industry', type: 'text',editable:true},
    { label: 'Phone', fieldName: 'Phone', type: 'phone',editable:true},
    { label:'Rating',fieldName:'Rating',type: 'text',editable:true}
   ];*/
    @wire(MessageContext)
    messageContext;
    @track columnvals=[];

    @track accounts = [];
    @api recordId;
    @track savedDrafValues=[];
    pageSize = 5;   
    lastRecordId = null;
    firstRecordId = null;
    totalRecordsLoaded = 0;
    pageHistory=[];
    currentPage = 1;

    @track actions = [
        {label:'showrelatedRedords',name:'show_contacts'}
    ]
     connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            MY_CHANNEL,
            (message) => {
                this.receivedId = message.recordId;
                console.log('receivedId', this.receivedId);
            }
            
        );
        
        
    }
    sendMessage() {
        const payload = {
            recordId: this.recordId
        };
        console.log('SENDING PAYLOAD', JSON.stringify(payload));

        publish(this.messageContext, MY_CHANNEL, payload);

        console.log('MESSAGE PUBLISHED');
        
    }
    wiredResult; // store wired response
    @track showContacts = false;
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        
        if(actionName=='show_contacts'){
            
            this.recordId=row.Id;
            
            this.handleshowContacts();

            setTimeout(() => {this.sendMessage();},100);
            //console.log("recordid",recordId);
        }
        
    }
    
    handleshowContacts(){
        this.showContacts=true;
        
    }
    //Wire method
    @wire(getAccountsByProfile,{lastId: '$lastRecordId', pageSize: '$pageSize',firstId:'$firstRecordId'})
    wiredAccounts(result) {
       console.log("data",result.data);
       this.wiredResult = result;
    
    if (result.data) {
        const fields = result.data.fields;     // "Id,Name,Industry"
        const records = result.data.records;   // Account list


        //PASS ONLY DATA (string)
        this.colscol(fields);
        this.accounts = records
            .map((row, index) => {
                const url=`/${row.Id}`;

                return{...row,rowNum: ((this.currentPage - 1) * this.pageSize) + index + 1,Nameurl:url}
            });
    } 
    else if (result.data) {
        console.error(error);
    }
}
   /*@wire(getAccountsKeyset, { lastId: '$lastRecordId', pageSize: '$pageSize',firstId:'$firstRecordId'})
    wiredAccounts(result) {
        this.wiredResult = result;
         console.log("result",result);
        if (result.data) {
            this.accounts = result.data
            .map((row, index) => {
                const url=`/${row.Id}`;
                return{...row,rowNum: ((this.currentPage - 1) * this.pageSize) + index + 1,Nameurl:url}
            });
            this.totalRecordsLoaded += result.data.length;
        } else if (result.error) {
            console.error(result.error);
        }
        console.log("accounts",this.accounts);
    }*/
    
    
    handleNext() {
    if (this.accounts && this.accounts.length > 0) {

        // store current first record for back navigation
        this.pageHistory.push(this.accounts[0].Id);

        // move forward using last record
        this.firstRecordId = null;
        this.lastRecordId = this.accounts[this.accounts.length - 1].Id;

        this.currentPage++;

        // refresh ALWAYS
        refreshApex(this.wiredResult);
    }
   }

   handlePre() {
      if (this.pageHistory.length > 0) {

        // go back using stored history
        this.firstRecordId = this.pageHistory.pop();
        this.lastRecordId = null;

        this.currentPage--;

        // refresh ALWAYS
        refreshApex(this.wiredResult);
    }
   }



    colscol(fieldstring) {
        const fields = fieldstring.split(',');
        
    let cols=[];

        cols.push({
           label: 'S.No',
           fieldName: 'rowNum'

        });
        
         
    // ✅ Loop fields (NOT accounts)
        fields.forEach(field => {
            console.log('eachfield',JSON.stringify(field));
        
        if (field === 'Name') {
            cols.push({
                label: 'Account Name',
                fieldName: 'Nameurl',
                type: 'url',
                typeAttributes: {
                    label: { fieldName: 'Name' },
                    target: '_blank'
                },
                editable:true
            });
            
        } 
        else if(field==='Id'){
            return;
        }
        
        else {
            cols.push({
                label: field,
                fieldName: field,
                type: 'text',
                editable:true
            });
        }
    });
    cols.push({
            type: 'action',
            typeAttributes: { rowActions: this.actions }

        });
        
    console.log('columnvals',JSON.stringify(cols));
    this.columnvals=cols; 
}
    
    //Manual refresh button (optional)
    handleRefresh() {
        
        this.lastRecordId = null;
        this.firstRecordId=null;
        this.currentPage=1;
        refreshApex(this.wiredResult);
    }
    
    handlesave(event){
           this.savedDrafValues=event.detail.draftValues;
           console.log("savedDrafValues",JSON.stringify(this.savedDrafValues));
           const recordInput=this.savedDrafValues.map(row => {
              const fieldupdate={...row};
              console.log('fileds',JSON.stringify(fieldupdate));
              return {fields:fieldupdate}
           });
           console.log("recordInput",JSON.stringify(recordInput));
           const promiseUpdate=recordInput.map(row=>updateRecord(row));
           Promise.all(promiseUpdate).then((result)=>{
            const eve=new ShowToastEvent({
                            title: 'Success',
                            message: 'Account saved successfully',
                            variant: 'success'
                        })
            this.dispatchEvent(eve);
            return refreshApex(this.wiredResult);
           })
           .catch(error=>{
               console.error('FULL ERROR:', JSON.stringify(error));
               const eveerr=new ShowToastEvent({
                            title: 'Success',
                            message: 'error',
                            variant: 'error'
                        })
            this.dispatchEvent(eveerr);
           })
           .finally(()=>{
               this.savedDrafValues=[];
           })
        }
    

}