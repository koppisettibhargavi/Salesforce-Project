trigger AutoDeleteUser on Instructor__c (After delete) {
    if (Trigger.isdelete){
        if(Trigger.isAfter){
            AutoDelete.AfterDelete(Trigger.old);
        }
       
    }  
}