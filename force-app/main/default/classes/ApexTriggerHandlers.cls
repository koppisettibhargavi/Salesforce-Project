public class ApexTriggerHandlers {
    public static void beforedeletecase(List<Account> oldAcc){
        //add an error to before insert case
        //list<Account> newdel=new list<Account>();
       // Profile p=[select id from profile where name='system Administrator'];
        //for(Account acc:oldAcc){
         //   if (userinfo.getprofileId()==p.id){
          //      newdel.add(acc);
           // }
        //}  
        //delete newdel;       
    }
    
    
    
public static void afterundelete(List<Account> listnew){
          List<Account> toUpdate = new List<Account>();
          for (Account acc :listnew) {
                 // upadating a field afterundelete 
              // toUpdate.add(new Account(Id=acc.id,Status__c ='Re-Active'));
              }
        if (!toUpdate.isEmpty()) {update toUpdate;}	
        system.debug('undeleted');
      }
    
    public static void beforeupdate(Map<Id,Account> oldDataMap,Map<Id,Account> newDataMap){
        //update
        set<Id> Keys=newdatamap.KeySet();
        set<Id> Keys1=oldDataMap.KeySet();
        for(Id k:Keys){
            String newind=newdatamap.get(k).industry;
            String oldind=olddatamap.get(k).industry;
            if (newind==null){
                system.debug('old industry media');
            }
            else{
                system.debug('old industry'+oldind);
            }
            if(oldind==null){
                system.debug('new industry Agri');
            }
            else{
                system.debug('new industry'+newind);
            }
        }
        
        for(Id p:Keys){
            newdatamap.get(p).industry='Banking';
        } 
        
    }
         
    
}