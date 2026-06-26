import { LightningElement ,wire,track,api} from 'lwc';
import createAccount from '@salesforce/apex/AccountController.createAccount';
import getFilteredValuesforAccount from '@salesforce/apex/differentoptionsforusers.getFilteredValuesforAccount';
import getAccountsByProfilefields from  '@salesforce/apex/differentoptionsforusers.getAccountsByProfilefields';
import getCurrentProfile from '@salesforce/apex/differentoptionsforusers.getCurrentProfile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AccountForm extends LightningElement {
    
    

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

    
    /*name = '';
    phone = '';
    industry = '';
    fax='';
    industryOptions = [
        { label: 'Banking', value: 'Banking' },
        { label: 'IT', value: 'IT' },
        { label: 'Healthcare', value: 'Healthcare' }
    ];
    profileName='';
    issystemadmin=false;
    isstandarduser=false;
    industryOptionsfromprofile = [];*/
    
    @track fields = [];

    @wire(getAccountsByProfilefields)
    wiredFields({ data, error }) {
        
        if (data) {
            
             this.fields = data.split(',').map(f => f.trim()).filter(f => f !== 'Id');
            //this.fields = data.split(',').map(f => `${this.objectApiName}.${f.trim()}`).filter(f => f !== 'Id');
            //this.fields = data.split(',').map(f => `Account.${f.trim()}`).filter(f => f !== 'Account.Id');
            console.log("fields",JSON.stringify(this.fields));
        }
        
        else if(error){
            console.log(error);
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



    /*@wire(getFilteredValuesforAccount)
    currentprofilevalues({data,error}){
       if(data){
        
          this.industryOptionsfromprofile = data.map(val => ({
                label: val,
                value: val
            }));
          console.log("datafromprofile",this.industryOptionsfromprofile);
       }
       else{
           console.log(error);
       }
    }
    
    handleName(event) {
        this.name = event.target.value;
    }

    handlePhone(event) {
        this.phone = event.target.value;
    }

    handleIndustry(event) {
        this.industry = event.target.value;
    }
    handleFax(event) {
        this.fax = event.target.value;
    }
    handleSave() {

        if (!this.name) {
            this.showToast('Error', 'Name is required', 'error');
            return;
        }

        createAccount({
            AccountDataFromPage:this.fields
        })
        .then(() => {
            this.showToast('Success', 'Account Created', 'success');
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }*/
}