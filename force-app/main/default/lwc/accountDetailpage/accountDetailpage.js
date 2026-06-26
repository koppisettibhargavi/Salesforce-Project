import { LightningElement ,wire,track,api} from 'lwc';
import createAccount from '@salesforce/apex/AccountController.createAccount';
import getFilteredValuesforAccount from '@salesforce/apex/differentoptionsforusers.getFilteredValuesforAccount';
import getAccountsByProfilefields from  '@salesforce/apex/differentoptionsforusers.getAccountsByProfilefields';
import getCurrentProfile from '@salesforce/apex/differentoptionsforusers.getCurrentProfile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from '@salesforce/apex';
export default class AccountDetailpage extends NavigationMixin(LightningElement){
    @api wiredResult;
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
        console.log('recordIdfromlwc:', this.recordId);
        console.log('objectApiNamefromlwc:', this.objectApiName);
    }

    renderedCallback() {
    console.log('recordIdrecordIdfromlwcren:', this.recordId);
    console.log('objectApiNamefromlwcren:', this.objectApiName);
    }
    handleSuccess() {
    
        refreshApex(this.wiredResult);
    }
    
    @track fields = [];

    @wire(getAccountsByProfilefields)
    wiredFields(result) {
        this.wiredResult = result.data;
        if (result.data) {
            
             this.fields = result.data.split(',').map(f => f.trim()).filter(f => f !== 'Id');
            //this.fields = data.split(',').map(f => `${this.objectApiName}.${f.trim()}`).filter(f => f !== 'Id');
            //this.fields = data.split(',').map(f => `Account.${f.trim()}`).filter(f => f !== 'Account.Id');
            console.log("fields",JSON.stringify(this.fields));
        }
        
        else if(result.error){
            console.log(result.error);
        }
    }
    
    @wire(getCurrentProfile)
    currentprofile({data,error}){
        if(data){
            
            this.profileName = data;
            if(this.profileName=='System Administrator'){
               this.issystemadmin=true;
               this.isstandarduser=false;
               console.log("currentuser",this.profileName);
            }
            else if(this.profileName=='Standard User'){
                this.isstandarduser=true;
                console.log("currentprofile",this.profileName)
                this.issystemadmin=false;
            }
                 
        }
        else{
            console.log(error);
        }
    }

    handleSuccessevent(event) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created successfully',
                    variant: 'success'
                })
            );
    }
}