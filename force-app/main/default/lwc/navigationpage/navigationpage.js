import { LightningElement,api} from 'lwc';
import { NavigationMixin } from "lightning/navigation";
export default class Navigationpage extends NavigationMixin(LightningElement) {
    @api recordId;
    @api tabName;
    navigateToNewRecordPage() {
      
    // Opens the new Account record modal
    // to create an Account.
    this[NavigationMixin.Navigate]({
      
      type: "standard__objectPage",
      attributes: {
        objectApiName:"contact",
        actionName: "new",
      },
    });
  }

  navigateToRecordViewPage() {
    // View a custom object record.
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: "001gL00000gL7b0QAC",
        //objectApiName: "namespace__ObjectName", // objectApiName is optional
        actionName: "view",
      },
    });
  }

  navigateToRecordEditPage() {
    // Opens the Account record modal
    // to view a particular record.
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.recordId,
        //objectApiName: "Account", // objectApiName is optional
        actionName: "edit",
      },
    });

    
  }
  navigateToHomePage() {
    // Opens the Account record modal
    // to view a particular record.
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        
        objectApiName: "contact", // objectApiName is optional
        actionName: "home"
      },
    });

    
  }

  navigateToListView() {
    // Navigate to the Contact object's Recent list view.
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "list",
      },
      state: {
        // 'filterName' is a property on the page 'state'
        // and identifies the target list view.
        // It may also be an 18 character list view id.
        filterName: "Recent", // or by 18 char '00BT0000002TONQMA4'
      },
    });
  }

  navigateNext() {
    this[NavigationMixin.Navigate]({
      type: "standard__navItemPage",
      attributes: {
        apiName: 'loan__c',
      },
    });
  }
  
  navigateToAppPage() {
    // Navigate to a specific CustomTab.
    this[NavigationMixin.Navigate]({
      type: "standard__navItemPage",
      attributes: {
        // CustomTabs from managed packages are identified by their
        // namespace prefix followed by two underscores followed by the
        // developer name. E.g. 'namespace__TabName'
        PageName: "home",
      },
    });
  }
  navigateTostandardhomePage() {
    // Navigate to a specific CustomTab.
    this[NavigationMixin.Navigate]({
      type: "standard__namedPage",
      attributes: {
        // CustomTabs from managed packages are identified by their
        // namespace prefix followed by two underscores followed by the
        // developer name. E.g. 'namespace__TabName'
        PageName: "home"
      },
    });
    
  }
    
}