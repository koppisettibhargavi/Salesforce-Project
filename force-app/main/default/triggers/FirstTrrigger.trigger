trigger FirstTrrigger on Account (before update ,after update,before delete,after Undelete,after insert,before insert) {
    
    //ApexTriggerHandlers.beforeInsert(my_List);

    if(Trigger.isDelete){
       if (Trigger.isbefore){
          ApexTriggerHandlers.beforedeletecase(Trigger.old);
          system.debug(Trigger.oldMap);
          //List<Account> MultieUpdate=[select name,id,rating from Account where Name='manju'];
          //if we have many records with name Ram
          //for (Account multi : MultieUpdate){
           // multi.rating='cold';
           //} 
         // update MultieUpdate;
         // system.debug(MultieUpdate);
          //system.debug('done by me');
        //
         
       }
    }
    
       if(Trigger.isunDelete){
       if (Trigger.isAfter){
          ApexTriggerHandlers.afterundelete(Trigger.new);
       }
       } 
    
    if(Trigger.isupdate){
       if (Trigger.isbefore){
          ApexTriggerHandlers.beforeupdate(Trigger.oldmap,Trigger.newmap);
       }
       } 
    
     
    
 }