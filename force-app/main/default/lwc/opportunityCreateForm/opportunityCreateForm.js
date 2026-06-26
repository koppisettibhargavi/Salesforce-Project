import { LightningElement,api,wire,track} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { CurrentPageReference } from 'lightning/navigation';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import RECORDTYPE_ID from '@salesforce/schema/Opportunity.RecordTypeId';
import {refreshApex} from '@salesforce/apex';
//import Controllerfun from '@salesforce/apex/Controllerfun.Controllerfun';
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
export default class OpportunityCreateForm extends NavigationMixin(LightningElement) {

    
    objectInfo;
    @track FieldsperRecord=['Name'];
    @api isModalOpen = false;
    @api selectedRecordTypeId;
    @api showForm=false;
    @track recordTypeOptions = [
    {
        label: 'Admin Record Type',
        value: '012gL000004teybQAA' // replace with Admin RT Id
    },
    {
        label: 'User Record Type',
        value: '012gL000004tf1pQAA' // replace with User RT Id
    }
    ];
    
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
      

    
    connectedCallback() {
       console.log('Component Loaded');
   
        if(this.recordId!=null){
            this.isModalOpen=false;
        }
        else{
            this.isModalOpen=true;
        }
    
    }

    
    
    

    // Close modal
    closeModal() {
        this.isModalOpen = false;
    }

    //Handle selection
    handleChange(event) {
        this.selectedRecordTypeId = event.detail.value;
        console.log('Selected RecordTypeId:', this.selectedRecordTypeId);

    }

    //Confirm selection
    handleConfirm() {
        this.isModalOpen = false;
        this.fieldvaluesperRt(this.selectedRecordTypeId);
        console.log('Selected RecordTypeId:', this.selectedRecordTypeId);
        this.showForm = true;
        

    }

     /*@wire(CurrentPageReference)
      pageRef;

     connectedCallback() {
        const action = this.pageRef?.attributes?.actionName;

        if (action === 'new') {
           console.log('New button clicked');
         }
    }
    @api wiredResults;


    // Page Reference (for Create)
    @wire(CurrentPageReference)
    pageRef;

    // Object Info (for default Record Type)
    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    objectInfo({ data }) {
       if (data) {
          const rtId = this.pageRef?.state?.recordTypeId || data.defaultRecordTypeId;
          console.log('Create RecordTypeId:', rtId);
          this.fieldvaluesperRt(rtId); //HANDLE CREATE HERE
        }
    }


    // Record data (for Edit)
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [RECORDTYPE_ID]
    })
    wiredRecord({ data, error }) {
        if (data) {
            this.wiredRecord=data;
            const rtId = data.fields.RecordTypeId.value;
            console.log('Edit RecordTypeId:', rtId);

            this.fieldvaluesperRt(rtId);
        } else if (error) {
            console.error('Error fetching record:', error);
        }

        
    }*/

    
   
           
        handleSuccessevent(event) {
            
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Opportunity created successfully',
                    variant: 'success'
                })
            );
           
            this.navigateToRecordPage();

            
        }

        handleCancle(event){
            this.navigateToObjectHome();
        }

    fieldvaluesperRt(selectedRecordTypeId) {

        if (selectedRecordTypeId === '012gL000004teybQAA') {

            this.FieldsperRecord = ['Name', 'StageName', 'CloseDate', 'Amount'];
        } 
        else if (selectedRecordTypeId === '012gL000004tf1pQAA') {

            this.FieldsperRecord = ['Name', 'Amount', 'Probability', 'StageName', 'CloseDate'];

        }

        console.log('Fields:', JSON.stringify(this.FieldsperRecord));
    }

    navigateToObjectHome() {
    // Navigate to the  object home page.
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Opportunity",
        actionName: "home",
      },
    });
   }
    navigateToRecordPage(event){
     let oppPage = {
      type: "standard__recordPage",
      attributes: {
        objectApiName: "Opportunity",
        recordId: "006gL00000PwIFtQAN", //event.detail.id
        actionName: "view",
      },
      } 
      this[NavigationMixin.Navigate](oppPage);
    }
}