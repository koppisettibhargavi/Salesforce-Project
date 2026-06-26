import { LightningElement,track,api,wire } from 'lwc';
import searchRecords from '@salesforce/apex/InitiativeController.searchRecords';
import getUserOwnedRecords from '@salesforce/apex/InitiativeController.getUserOwnedRecords';
import searchRecordsuser from '@salesforce/apex/InitiativeController.searchRecordsuser';
import addMember from '@salesforce/apex/InitiativeController.addMember';
import getTeamMembers from '@salesforce/apex/InitiativeController.getTeamMembers';
import deleteRecord from '@salesforce/apex/InitiativeController.deleteRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import getUsers from '@salesforce/apex/InitiativeController.getUsers';
import transferMember from '@salesforce/apex/InitiativeController.transferMember';

const COLUMNS = [
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Phase', fieldName: 'Phase__c', type: 'text' },
    { label: 'TeamMember', fieldName: 'teamCount', type: 'text' }
]; 

const transferColumns = [

    {
        label: 'Team Member Number',
        fieldName: 'Team_Members_Name__c',
        type: 'text'
    },

    {
        label: 'Assigned User',
        fieldName: 'ownerName',
        type: 'text'
    },
     {
        label: 'Name',
        fieldName: 'Name',
        type: 'text'
    },
    {
        label: 'Initiative',
        fieldName: 'Initiative__c',
        type: 'text'
    },

    {
        label: 'Discipline',
        fieldName: 'Discipline__c',
        type: 'text'
    },

    

    
];


export default class ImportWizard extends NavigationMixin(LightningElement) {
    @api recordId; // Parent Account ID context
    @track childContacts = [];
    wiredTeamMembers;
    teamMemberData=[];
    columns = COLUMNS;
    transfercolumns = transferColumns;
    @track currentStep = 1;
    @track selectedMode = '';
     // Track radio button choice
    @track records;
    selectedUserId;
    selectedAction2='';
    isSelected = false;
    showDropdown = false;
    recordsadd;
    showAddButton = false;
    initiativeCount = 0;
    showModal;
    initiativeId;
    userName = '';
   initiativeName = '';
   discipline = '';
   allocation;
   showTransferModal = false;
   selectedTeamMemberId;
   selectedTransUserId;
    // Example Wire to fetch child contacts under the parent Account
    // @wire(getRelatedContacts, { accountId: '$recordId', searchKey: '$searchKey' })
    // wiredContacts({ error, data }) {
    //     if (data) {
    //         this.childContacts = data;
    //     } else if (error) {
    //         console.error(error);
    //     }
    // }
    userOptions = [];

@wire(getUsers)
wiredUsers({ data, error }) {

    if (data) {

        this.userOptions = data.map(user => {
            return {
                label: user.Name,   // shown in dropdown
                value: user.Id      // stored value
            };
        });

        console.log(this.userOptions);
    }

    if (error) {
        console.log(error);
    }
   }
    handleTransfer() {
       console.log("tranfer data",this.selectedTeamMemberId);
       console.log("tranfer data",this.selectedTransUserId)
       transferMember({
            teamMemberId: this.selectedTeamMemberId,
            newUserId: this.selectedTransUserId
      })
      .then(() => {
        
        console.log('Transferred');
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Team Member Transfer successfully',
                variant: 'success'
            })
        );
        this.showTransferModal = false;
        
        // optional refresh
        refreshApex(this.wiredTeamMembers);
        
      })
      .catch(error => {
         console.log(error);
      });
  }
    get actionscols(){
        if (this.selectedAction2 === 'Transfer') {

        return [

            ...this.transfercolumns,

            {
                type: 'button',
                typeAttributes: {
                    label: 'Transfer',
                    name: 'transfer',
                    variant: 'brand'
                }
            }
        ];
        } 
        if (this.selectedAction2 === 'Delete') {

        return [

            ...this.transfercolumns,

            {
                type: 'button',
                typeAttributes: {
                    label: 'Delete',
                    name: 'delete',
                    variant: 'destructive'
                }
            }
        ];
        } 
        return [];

    }
    @wire(getTeamMembers)
    wiredMembers(result) {
    
        this.wiredTeamMembers=result;
        if (result.data) {
        console.log('WIRE EXECUTED'); 
        this.teamMemberData = result.data.map(row => ({
            ...row,
            ownerName: row.Owner ? row.Owner.Name : '',
            initiativeName: row.Initiative__r ? row.Initiative__r.Name : ''
        }));

        console.log('team data', this.teamMemberData);
        
       }

       if (result.error) {
        console.log(result.error);
       }
   }


    @track userList = [];

    showDropdownuser= false;

    selectedUserId_user;
    show=true;
    handleUserName(event){
    this.userName = event.target.value;
}

handleInitiative(event){
    this.initiativeName = event.target.value;
}
name;
handleName(event){
   this.name=event.target.value;
}

handleDiscipline(event){
    this.discipline = event.target.value;
}

handleAllocation(event){
    this.allocation = event.target.value;
}
    // typing in input
    handleSearch(event) {

        this.searchKeyuser = event.target.value;
        console.log("this.searchKeyuser",this.searchKeyuser);
        this.showDropdownuser = true;
        
        searchRecordsuser({ searchText: this.searchKeyuser })
            .then(result => {

                this.userList = result;
                console.log('userresult',JSON.stringify(result));
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    // selecting dropdown value
    handleSelectUser(event) {

        this.selectedUserId_user = event.currentTarget.dataset.id;

        this.searchKeyuser= event.currentTarget.dataset.name;

        // close dropdown
        this.showDropdownuser= false;
        this.showAddButton = true;
        console.log('Selected user id:', this.selectedUserId_user);
    }
    openTeamMemberModal() {
        this.showModal = true;
    }
    closeModal() {
       this.showModal = false;
    }
    closeModaluser() {
      this.showTransferModal = false;
    }
    saveRecord() {
        // call apex insert here
        this.showModal = false;
        addMember({
           name:this.name,
           initiativeId : this.initiativeId,
           userId : this.selectedUserId_user,
           discipline : this.discipline,
           allocation : this.allocsation
        })
       .then(() => {
           console.log('Inserted');
           this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Team Member added successfully',
                variant: 'success'
            })
          );
          return refreshApex(this.wiredTeamMembers);
        })
       .catch(error => {
           console.log(error);
        });
    } 
    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        if (selectedRows.length > 0) {
            this.selectedContact = selectedRows[0];
            this.initiativeId = selectedRows[0].Id; 
        } else {
            this.selectedContact = undefined;
            this.initiativeId = null;
        }
        
    }
    // Step verification
    get isStep1() { return this.currentStep === 1; }
    get isStep2() { return this.currentStep === 2; }
    get isStep3() { return this.currentStep === 3; }

    // Pre-select radio state helpers
    get isSingleMode() { return this.selectedMode === 'single'; }
    get isBulkMode() { return this.selectedMode === 'bulk'; }

    // Navigation configuration
    get showBack() { return this.currentStep > 1; }
    get nextButtonLabel() { return this.isSelected? 'Confirm' : 'Continue'; }
    get isNextDisabled() { return this.currentStep === 1 && !this.selectedMode; }

    // Dynamic SLDS Path Classes
    get step1Class() {
        if (this.currentStep === 1) return 'slds-path__item slds-is-current slds-is-active';
        return 'slds-path__item slds-is-complete';
    }

    get step2Class() {
        if (this.currentStep === 2) return 'slds-path__item slds-is-current slds-is-active';
        if (this.currentStep > 2) return 'slds-path__item slds-is-complete';
        return 'slds-path__item slds-is-incomplete';
    }

    get step3Class() {
        if (this.currentStep === 3) return 'slds-path__item slds-is-current slds-is-active';
        return 'slds-path__item slds-is-incomplete';
    }

    // Action handlers
    handleModeChange(event) {
        this.selectedMode = event.target.value;
        this.searchKey=''
        this.selectedAction='';
       this.isSelected=false;
    }

    handleNext() {
        if (this.currentStep < 3) {
            this.currentStep += 1;
        } else {
            // Process completion logic
            console.log('Wizard Completed with mode: ' + this.selectedMode);
        }
    }

    handleBack() {
        if (this.currentStep > 1) {
            this.currentStep -= 1;
        }

    }

    
    handleCancel() {
        this.currentStep = 1;
        this.selectedMode = '';
        // Optional custom event dispatch to notify parent element wrappers to close modal
        this.dispatchEvent(new CustomEvent('closewizard'));
    }
    get actionOptionsteam() {
        return [
            { label: 'Add', value: 'Add' },
            { label: 'Transfer', value: 'Transfer' },
            { label: 'Delete', value: 'Delete' }
        ];
    }
    get isAdd() {
        return this.selectedAction2 === 'Add';
    }

    get isTransfer() {
        return this.selectedAction2 === 'Transfer';
    }

    get isDelete() {
        return this.selectedAction2 === 'Delete';
    }
   selectedRowIds = [];

   handleRowSelectionteam(event){

       this.selectedRowIds=event.detail.selectedRows.map(row => row.Id);
       console.log("selectedRowIds",JSON.stringify(this.selectedRowIds));
   }
   handleUserChange(event) {
      this.selectedTransUserId = event.detail.value;
   }

   handleRowAction(event) {
       
    const row = event.detail.row;
    const actionName = event.detail.action.name;
    
    this.selectedTeamMemberId = row.Id;

    

       if (this.selectedAction2 === 'Transfer') {
          //this.selectedTeamMemberId = row.Id;
           /*this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__transferpage'
            },
            state: {
                c__teamMemberId: row.Id
            }
        });*/
         this.showTransferModal = true;
       }

       if (this.selectedAction2 === 'Delete') {
            console.log('i am delete');
            deleteRecord({
                teamMemberId: row.Id
            })
           .then(() => {
                this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Team Member removed successfully',
                variant: 'success'
            })
        );

               console.log('Deleted successfully');
               return refreshApex(this.wiredTeamMembers);
            })
           .catch(error => {
              console.log(error);
           });
           
        }

       
       
    }

   
    handleActionChange2(event) {
       this.selectedAction2 = event.detail.value;
       console.log('Selected:', this.selectedAction);
    }
    handleActionChange(event) {
        this.selectedAction = event.detail.value;
        
    }
    actionOptions = [
    { 
        label: 'Update Owner of Initiatives/Workstream', 
        value: 'Update Owner of Initiatives/Workstream' 
    },
    { 
        label: 'Update Approver of Initiatives/Workstream', 
        value: 'Update Approver of Initiatives/Workstream' 
    },
    { 
        label: 'Add and Remove Team Members from the Initiative', 
        value: 'Add and Remove Team Members from the Initiative' 
    }
];

    // Mock dataset representing users matching the search panel
    mockUserData = [
        { name: 'Vaseem Mohammed', email: 'm.vaseem@shell.com' },
        { name: 'Vaseem Khan', email: 'v.khan@shell.com' },
        { name: 'John Doe', email: 'j.doe@shell.com' }
    ];
        // Automatically drops down the panel when the user clicks inside the input
    get isDropdownOpen() { 
        return this.isInputFocused; 
    }

    // Appends 'slds-is-open' dynamically to show or hide the absolute floating box layout
    get dropdownTriggerClass() {
        return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${this.isDropdownOpen ? 'slds-is-open' : ''}`;
    }

    // Live search lookahead array filter mapping target keys to lowercase matches
    get filteredUsers() {
        return;
    }

    // Validates if matching array items exist to switch empty states warning labels
    get hasRecords() { 
        return;
    }
        // Tracks picklist change modifications for "Choose an action"
    handleActionChange(event) { 
        this.selectedAction = event.detail.value; 
    }
    
    
    // Refreshes search values reactively as the user types
    

    
    handleSearchChange(event){
        this.searchText = event.target.value;
        
        this.showDropdown=true;
            //this.searchText= this.searchText.split(' ').join('');
            this.searchText= this.searchText.toLowerCase();
            //str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
            console.log('serchtext',this.searchText);
            this.loadRecords();
            
    
    }
    

    loadRecords() {
            searchRecords({
                searchText: this.searchText
            })
            .then(result => {
                this.records = result;

                console.log('data', JSON.stringify(result));
            })
           .catch(error => {
               console.error(error);
            });
    }
    DataTableRecords() {
            getUserOwnedRecords({
                selectedUserId: this.selectedUserId
            })
            .then(result => {
                this.childContacts = result;
                 console.log('data', JSON.stringify(result));
                 this.initiativeCount = result.length;
                 this.childContacts = result.map(record => {
                return {
                    ...record,

                    // count child records
                     teamCount: record.TeamMembers__r 
                           ? record.TeamMembers__r.length 
                           : 0
                };
            });

        console.log(JSON.stringify(this.childContacts));
            })
           .catch(error => {
               console.error(error);
            });
    }

    // Opens result drop-down box
    handleInputFocus() { 
        this.isInputFocused = true; 
        
    }

    // Closes listbox dropdown layout smoothly with a minimal delay to catch target choice clicks
    handleInputBlur() {
        setTimeout(() => {
            this.isInputFocused = false;
        }, 620);
    }

    // Sets selected lookup option string context back into the field
    /*handleUserSelection(event) {
        this.searchKey = event.currentTarget.dataset.name;
        this.isInputFocused = false;
    }*/
    selecteduserEmail;
    handleSelect(event) {
        this.selectedUserId = event.currentTarget.dataset.id;
        this.searchKey = event.currentTarget.dataset.name;

        this.isSelected = true;
        console.log("isSelected",this.isSelected);
        this.showDropdown = false;
        this.selecteduserEmail=event.currentTarget.dataset.email;
        this.records = [];
        this.DataTableRecords(this.selectedUserId);
        console.log(this.selectedUserId);
    }

}