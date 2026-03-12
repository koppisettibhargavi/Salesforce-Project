import { LightningElement,track} from 'lwc';

export default class Parent extends LightningElement {
    account_data = {
        name: 'Salesforce',
        industry: 'IT',
        rating: 'Hot'
    };
    @track valfromparent;
    name='ram';
    handleChange(event){
        this.valfromparent=event.target.value;
    }  
}