import { LightningElement,track,wire} from 'lwc';
import searchRecords from '@salesforce/apex/InitiativeController.searchRecords';
export default class MyInitiatives extends LightningElement {

    @track initiatives = [];

    showImportWizard = false;

    searchText = ' ';
    selectedRole = 'Owner';
    selectedShow = 'All';
    selectedStatus = '';
    hideConfidential = true;
    pageSize = '10';

    ownerId;

    columns = [
        {
            label:'Initiative Name',
            fieldName:'Name'
        },
        {
            label:'Owner',
            fieldName:'OwnerName'
        },
        {
            label:'Status',
            fieldName:'Status__c'
        }
    ];

    roleOptions = [
        {
            label:'Initiative Owner',
            value:'Owner'
        },
        {
            label:'Approver',
            value:'Approver'
        }
    ];

    showOptions = [
        {
            label:'All',
            value:'All'
        },
        {
            label:'Active',
            value:'Active'
        }
    ];

    statusOptions = [
        {
            label:'On Track',
            value:'On Track'
        },
        {
            label:'Needs Attention',
            value:'Needs Attention'
        }
    ];

    pageSizeOptions = [
        {
            label:'10',
            value:'10'
        },
        {
            label:'25',
            value:'25'
        },
        {
            label:'50',
            value:'50'
        }
    ];

    handleSearch(event){
        this.searchText = event.target.value;
        
        
            //this.searchText= this.searchText.split(' ').join('');
            this.searchText= this.searchText.toLowerCase();
            //str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
            console.log('serchtext',this.searchText);
            this.loadRecords();
    
    }

    
    

    handleRoleChange(event){
        this.selectedRole = event.detail.value;
    }

    handleShowChange(event){
        this.selectedShow = event.detail.value;
    }

    handleStatusChange(event){
        this.selectedStatus = event.detail.value;
    }

    handleToggle(event){
        this.hideConfidential =
        event.target.checked;
    }

    handlePageSize(event){
        this.pageSize =
        event.detail.value;
    }

    handleOwnerChange(event){
        this.ownerId =
        event.detail.recordId;
    }

    

    exportCSV(){
        console.log('Export');
    }

    openImportWizard(){
        this.showImportWizard = true;
    }

   

    

    handleCloseWizardModal(event) {
        // This logic runs when the child component dispatches 'closewizard'
        this.showImportWizard = false; 
        console.log('Successfully caught closewizard event from child component.');
    }
}