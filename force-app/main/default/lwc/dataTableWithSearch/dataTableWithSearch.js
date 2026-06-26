import { LightningElement,track,wire,api} from 'lwc';
import KeywordSearch from '@salesforce/apex/paginationclass.KeywordSearch'; 
import getContactsByProfilefields from '@salesforce/apex/differentoptionsforusers.getContactsByProfilefields';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import {refreshApex} from '@salesforce/apex';
import { NavigationMixin } from "lightning/navigation";
export default class DataTableWithSearch extends NavigationMixin(LightningElement) {
    /*@track colscol= [
        { label: 'Account Name', fieldName: 'Name', type: 'text'},
        { label: 'Industry', fieldName: 'Industry', type: 'text'},
        { label: 'Phone', fieldName: 'Phone', type: 'phone'},
        { label:'Rating',fieldName:'Rating',type: 'text'}
    ];*/
     

    
    
    @track colvaluesdynamic=[];
    keyword='ram';
    @track contactList=[];
    _recordId;
    _objectApiName;

    @api
    set recordId(value) {
        this._recordId = value;
        console.log('recordId updated:', value);
    }
    get recordId() {
        return this._recordId;
    }

    @api
    set objectApiName(value) {
        this._objectApiName = value;
        console.log('objectApiName updated:', value);
    }
    
    get objectApiName() {
        return this._objectApiName;
    }
    handlechnage(event){   
       this.keyword=event.target.value;
    }
    actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' }
    ];
    isModalOpen = false;
    // Open modal
    openModal() {
        this.isModalOpen = true;
    }

    // Close modal
    closeModal() {
        this.isModalOpen = false;
    }

    // After Save
    handleSuccess() {
        this.isModalOpen = false;

        // 🔥 Refresh datatable
        refreshApex(this.wiredResult);
    }
    handleNewContact(){
       console.log("button clicked");
       this.navigateToNewRecordPage();
       
    } 
    navigateToNewRecordPage() {
      
    // Opens the new Account record modal
    // to create an Account.
    this[NavigationMixin.Navigate]({
      
      type: "standard__objectPage",
      attributes: {
        objectApiName:"contact",
        actionName: "new",
      },
    });
  }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log('Row Id:', row.Id);
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'show_details':
                this.showRowDetails(row);
                break;
            default:
        }
    }

    showRowDetails(row) {
        this.record = row;
        console.log('record',JSON.stringify(row));
        this.navigateToRecordViewPage(row.Id);
    }

    deleteRow(row) {
        console.log("deleteDataConnector",JSON.stringify(row));
    }

    navigateToRecordViewPage(rowId) {
            // View a custom object record.
            this[NavigationMixin.Navigate]({
              type: "standard__recordPage",
              attributes: {
                recordId: rowId,
                objectApiName: "Contact", // objectApiName is optional
                actionName: "view",
              },
            });
    }

    colscol(fields) {
        
    let cols=[];

        cols.push({
           label: 'S.No',
           fieldName: 'rowNum'

        });
        
         
    // Loop fields (NOT accounts)
        fields.forEach(field => {
            console.log('eachfield',JSON.stringify(field));



        if (field === 'Id' || field === 'FirstName') {
            return;
        }    
        
        else if (field === 'LastName') {
            cols.push({
                label: 'Contact Name',
                fieldName: 'Nameurl',
                type: 'url',
                typeAttributes: {
                    label: { fieldName: 'Name' },
                    target: '_blank'
                },
            });
            
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
    this.colvaluesdynamic=cols; 

    }
    
    @wire(getContactsByProfilefields, { recordIdval:'$recordId'})
    wiredAccounts(result) {
        this.wiredResult = result;
        if (result.data) {

            // Convert fields string → array
            const fields = result.data.fields
                ? result.data.fields.split(',').map(f => f.trim())
                : [];

            const records = result.data.records || [];

            console.log('FIELDS:', fields);
            console.log('RECORDS:', JSON.stringify(records));

            // Build columns
            this.colscol(fields);
            this.contactList = records
            .map((row, index) => {
                const url=`/${row.Id}`;
                return{...row,rowNum: index+1,Name: `${row.FirstName || ''} ${row.LastName || ''}`.trim(),Nameurl:url}
            });
            console.log("contactList",JSON.stringify(this.contactList));
        }
        
        
    }

   /* @wire(getContactsByProfilefields,{ keywordval: '$keyword'})
    wiredContact(result){
    
            this.wiredResult=result;
            console.log("result",JSON.stringify(result));

        if (result.data) {
            this.accounts = result.data
        } else if (result.error) {
            console.error(result.error);
        }
    }*/


}