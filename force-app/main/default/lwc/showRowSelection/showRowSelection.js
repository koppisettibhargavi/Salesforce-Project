import { LightningElement,track} from 'lwc';
import getAccount from '@salesforce/apex/Datableclass.getAccount';
export default class ShowRowSelection extends LightningElement {
    @track colscol= [
    { label: 'Account Name', fieldName: 'Name', type: 'text'},
    { label: 'Industry', fieldName: 'Industry', type: 'text'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone'},
    { label:'Rating',fieldName:'Rating',type: 'text'}
   ];
   @track dataTableData=[];
   @track selectedRows=[];
      connectedCallback(){
           this.getData(); //get execute when page got refreshed
      }

      getData(){
          getAccount().then(result => {
                this.dataTableData=result; 
                    console.log('result',result);
               })
               .catch(error => {
                   console.log('Error:', error);
               });
      }

      handleSelectionRow(event){
           this.selectedRows=event.detail.selectedRows;
           console.log('selectedrows'+JSON.stringify(this.selectedRows));
      }
}