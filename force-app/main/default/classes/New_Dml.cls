public class New_Dml {
    public List<Account> InsertList {get; set;}
    public string myMsg{get;set;}
    public boolean myMsgErr{get;set;}
    public void InsertFun(){
           // Create two accounts, one of which is missing a required field
           Account[] accts = new List<Account>{ new Account(name='sita',rating='worm',phone='878798995'),new Account(name='sita',rating='worm',phone='878798995')
          };
          Database.SaveResult[] srList = Database.insert(accts, false);
   
          // Iterate through each returned result
          for (Database.SaveResult sr : srList) {
              if (sr.isSuccess()) {
                 // Operation was successful, so get the ID of the record that was processed
                 System.debug('Successfully inserted account. Account ID: ' + sr.getId());
                  myMsg='Successfully inserted accoun';
                  myMsgErr=true;
                 }
             else {
                 // Operation failed, so get all errors                
                 for(Database.Error err : sr.getErrors()) {
                     System.debug('The following error has occurred.');                    
                     System.debug(err.getStatusCode() + ': ' + err.getMessage());
                     System.debug('Account fields that affected this error: ' + err.getFields());
                        //myMsg=err.getMessage();
                     }
                 myMsgErr=false;
                 }
           }
        
        /*List<Account> InsertList=new List<Account>{
            new Account(name='sita',rating='worm',phone='878798995'),new Account(name='sita',rating='worm',phone='878798995')
        }; 
        insert InsertList;
        system.debug(srList);*/
        
       InsertList=[select name,rating,phone from Account];

    }
    
    public void UpdateFun(){
        Account UpdateList=[select name,id,rating from Account where Name='ram'];
        UpdateList.rating='cold';
        update UpdateList;
        system.debug(UpdateList);
        
        List<Account> MultieUpdate=[select name,id,rating from Account where Name='ram'];
        //if we have many records with name Ram
        for (Account multi : MultieUpdate){
            multi.rating='hot';
        } 
        
        update MultieUpdate;
        system.debug(MultieUpdate); 
    }
    
    public void UpsertFun(){
        List<Account> UpsertList=new List<Account>{
            new Account(name='sita',rating='cold',phone='878798995'),new Account(name='sitara',rating='worm',phone='878798995')
        }; 
         
       upsert UpsertList; 
       system.debug(UpsertList);
    }
    
    
    
}