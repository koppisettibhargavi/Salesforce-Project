trigger deletecase on Account (after delete) {
 
    if (Trigger.isdelete){
        
        if(Trigger.isAfter){
         //   AutoDelete.AfterDelete(Trigger.newmap);
        }
       
    }  

}