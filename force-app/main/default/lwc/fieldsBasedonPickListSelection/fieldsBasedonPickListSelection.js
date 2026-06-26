import { LightningElement,wire,api,track} from 'lwc';
import getFieldsByPlan from '@salesforce/apex/Controllerfun.getFieldsByPlan';
export default class FieldsBasedonPickListSelection extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track wireResult=[]; 
    @track fieldsPlaceHolders=[];
    @track plans = ['ESOP', 'KSOP', 'GSOP', 'MSOP']

    @api selectedPlan;
    @api showDropdown=false; 
    @wire(getFieldsByPlan,{recordIdval:'$recordId'})
     wireaccountfields(result){
       //console.log("planbasedfilds",JSON.stringify(result.data));

       if(result.data){
          this.selectedPlan=result.data.planSetValue;
          this.wireResult=result.data;
          this.fieldsPlaceHolders=result.data.fields.split(',').map(f => f.trim());
          console.log("data",JSON.stringify(result.data));
          console.log("planbasedfields",JSON.stringify(this.fieldsPlaceHolders));
          console.log("selectedPlan",JSON.stringify(this.selectedPlan));
         
       }
       else if (result.error) {
            console.error('Error:',result.error);
        }
      
       
       
    }

    toggleDropdown() {
        console.log("showDropdown",this.showDropdown);
        this.showDropdown = !this.showDropdown;

    }

     get remainingPlans() {
        return this.plans
            .filter(plan => plan !== this.selectedPlan)
            .map(plan => ({
                label: plan,
                value: plan
            }));
    }

    get dropdownClass() {
        return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${this.showDropdown ? 'slds-is-open' : ''}`;
    }

 
}