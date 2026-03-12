trigger Recuersion on Account (before insert,before update) {
   /*if (Trigger.isinsert){
        if(Trigger.isbefore){
            system.debug('done 1');
            if(!PreventRecursion.firstcall){
                PreventRecursion.firstcall=true;
                NewRecursionHandler.Insertfun(Trigger.new);
                system.debug('trigger'+Trigger.new);
            }
            
        }
    }*/
    
   /* if(Trigger.isupdate){
        if(Trigger.isbefore){
            if(!PreventRecursion.firstcall){
                PreventRecursion.firstcall=true;
                NewRecursionHandler.UpdateFun(Trigger.oldmap,Trigger.newmap);
            system.debug('trigger done');
            }
            
        }
    }*/
}