trigger SecondTrigger on Contact (after insert,after delete, after Undelete) {
    if(Trigger.isinsert){
        if(Trigger.isafter){
            Contact_Count.totalContactCount(Trigger.New);
            system.debug('done second one');
        }
    }
    if(Trigger.isdelete){
        if(Trigger.isafter){
            Contact_Count.totalContactCount(Trigger.old);
            system.debug('done second one');
        }
    } 
    if(Trigger.isUndelete){
        if(Trigger.isafter){
            Contact_Count.totalContactCount(Trigger.New);
            system.debug('done second one');
        }
    }
}