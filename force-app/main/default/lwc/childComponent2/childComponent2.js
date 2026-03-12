import { LightningElement ,api,wire} from 'lwc';
import getsearchDatafun from '@salesforce/apex/SearchData.getsearchDatafun';
import { MessageContext,publish,pulish} from 'lightning/messageService';
import AccountId from '@salesforce/schema/AccountHistory.AccountId';
export default class ChildComponent2 extends LightningElement {
    @api searchdata2;
    @wire(MessageContext) MessageContext
    cols= [
    {label:'Id',fieldName:'Id',type:'text'},
    { label: 'Name', fieldName: 'Name',type:'text'},
    { label: 'Phone', fieldName: 'Phone',type:'phone'},
    { label: 'Industry', fieldName: 'Industry',type:'text'},
    {
        type: 'button',
        label: 'Action',
        typeAttributes: {
            label: 'View',
            value:'view_contacts',
            variant: 'brand'
              
        }
    }
    ];

    currentId;
    currentName;
    handleViewButton(event){
        if(event.detail.action.value=='view_contacts'){
           this.currentName=event.detail.row.Name;
           this.currentId=event.detail.row.Id;
           const payload = {
                AccountId:this.event.detail.row.Id,
                AccountName:this.event.detail.row.Name
           };
           publish(this.MessageContext,bhargavi,payload);
    
        }
    }
    @wire(getsearchDatafun,{accname:'$searchdata2'}) accountRecordData;
    

    
}