trigger StudentTrigger on student8__c (before insert,before delete,after undelete) {
    if(trigger.isinsert){
        if(trigger.isbefore){
            Student8_TriggerHandler.InsertOnStudent(trigger.new);
            system.debug('i am done');
        }
    }
    if(trigger.isdelete){
       if(trigger.isbefore){
           Student8_TriggerHandler.deleteError(trigger.old);
           system.debug('i am done1');
        }
     } 
    
    if(trigger.isundelete){
        if(trigger.isafter){
            Student8_TriggerHandler.undeleteerror(trigger.new);
        }
    }
}