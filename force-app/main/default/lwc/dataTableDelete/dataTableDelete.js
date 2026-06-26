import { LightningElement,track,wire} from 'lwc';
import getDelete from '@salesforce/apex/DeleteDataTable.getDelete'; 
import getAccount from '@salesforce/apex/Datableclass.getAccount'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import {refreshApex} from '@salesforce/apex';
export default class DataTableDelete extends LightningElement {
    @track colscol= [
        { label: 'Account Name', fieldName: 'Name', type: 'text'},
        { label: 'Industry', fieldName: 'Industry', type: 'text'},
        { label: 'Phone', fieldName: 'Phone', type: 'phone'},
        { label:'Rating',fieldName:'Rating',type: 'text'}
    ];
    isLoaddelete=false;
    @track dataTableData=[];
    @track wiredAccountResult;
    @track selectedRows=[];
    acckeyval='sita';
    @wire (getAccount)
    wiremethodata(result){
        this.wiredAccountResult=result;
        if(result.data){
           this.dataTableData = result.data;
        }
       else if(result.error){
            console.log(result.error);
        }
       
        
    }
    /*connectedCallback(){
        this.getAccountData(); //get execute when page got refreshed
    }*/
     
    get labelname(){
       return this.isLoaddelete?'Undelete':'Delete';
   }
    
    /*getAccountData(){
        this.isLoaddelete=!this.isLoaddelete;
        getAccount().then(result => {
            this.dataTableData=result; 
            console.log('result',result);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }*/
                
    handleSelectionRow(event){  
        this.selectedRows=event.detail.selectedRows;
        console.log('selectedrows'+JSON.stringify(this.selectedRows));
    }
    
    onDelete(){
        console.log('i am at delete');
        getDelete({acclist:this.selectedRows}).then(result => {
            //
            refreshApex(this.wiredAccountResult);
            console.log('this.wiremethodata',JSON.stringify(this.wiredAccountResult));
            this.template.querySelector('lightning-datatable').selectedRows=[];
            this.selectedRows=[];
            const eve=new ShowToastEvent({
                title: 'Success',
                message: 'Account deleted successfully',
            })
            this.dispatchEvent(eve);

            
           /* setTimeout(()=>{
                window.location.reload();
             },1000);*/
        })  
        .catch(error => {
            
            let message = 'Unknown error';
            if (error.body) {
              if (error.body.message) {
                message = error.body.message;
             } 
            else if (error.body.pageErrors && error.body.pageErrors.length > 0) {
                message = error.body.pageErrors[0].message;
            }
           }
            const eve=new ShowToastEvent({
                title:'error',
                message: message,
                variant: 'error'
            })
            this.dispatchEvent(eve);
        })
        
    }
}