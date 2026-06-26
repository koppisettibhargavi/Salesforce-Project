import { LightningElement,track} from 'lwc';
import getAccount from '@salesforce/apex/Datableclass.getAccount';
import { NavigationMixin } from "lightning/navigation";
export default class DataTable extends NavigationMixin(LightningElement) {
    @track actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
]
   @track colscol= [
    { label: 's.no', fieldName: 'rowNum'},
    { label: 'Account Name', fieldName: 'Nameurl', type: 'url',
        typeAttributes:{
            label:{fieldName: 'Name'},
            target:'_blank',
        }
    },
    { label: 'Industry', fieldName: 'Industry', type: 'text'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone'},
    { label:'Rating',fieldName:'Rating',type: 'text'},{
        type: 'action',
        typeAttributes: { rowActions: this.actions },
    },
   ];
   isLoad=false;
   @track dataTableData=[];
   connectedCallback(){
        //this.getData(); //get execute when page got refreshed
   }

   get labelname(){
       return this.isLoad?'UnLoad':'LoadData';
   }
   clickfun(){
    this.isLoad=!this.isLoad;
    //alert(this.isLoad);
    if(this.isLoad){
        this.getData();
    }
    else{
        this.records=[];
    }
   
    
    
   }
   handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
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
   deleteRow(row) {
        console.log("deleteDataConnector",JSON.stringify(row));
    }
    navigateToRecordViewPage(rowId) {
            // View a custom object record.
            this[NavigationMixin.Navigate]({
              type: "standard__recordPage",
              attributes: {
                recordId: rowId,
                //objectApiName: "namespace__ObjectName", // objectApiName is optional
                actionName: "view",
              },
            });
          }

    showRowDetails(row) {
        this.record = row;
        console.log('record',JSON.stringify(row));
        this.navigateToRecordViewPage(row.Id);
    }

   

   

   records = [];
   lastId = null;
   getData(){
        
        getAccount({ lastRecordId: this.lastId })
            .then(result => {
                this.records = [...this.records, ...result];
                if(result.length > 0){
                    this.lastId = result[result.length - 1].Id;
                }
        });
       
   }
       

}