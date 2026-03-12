public class ListPratice {
    public List<Account> list_1{get;set;}
    public Set <Account> Set_1{get;set;}
    public List <Account> set_list{get;set;}
    public Map <string,Account> First_map{get;set;}
    
    public ListPratice(){
        list_1=new List <Account>();
        Account a1=new Account(Name='acc1',Industry='Health');
        Account a2=new Account(Name='acc2',Industry='Banking');
        Account a3=new Account(Name='acc3',Industry='Health'); 
        
        list_1.add(a1);
        list_1.add(a2);
        list_1.add(a3);
        system.debug('My List:'+list_1);
        
        Set_1=new Set <Account>();
        Account s1=new Account(Name='acc1',Industry='Health');
        Account s2=new Account(Name='acc2',Industry='Banking');
        Account s3=new Account(Name='acc3',Industry='Health'); 
        
        Set_1.add(s1);
        Set_1.add(s2);
        Set_1.add(s3);
        set_list=new List<Account>(Set_1);
         
        First_map=new Map<string,Account>();
        Account n1=new Account(Name='acc1',Industry='Health');
        Account n2=new Account(Name='acc1',Industry='Health');
        Account n3=new Account(Name='acc1',Industry='Health');
        First_map.put('afsd56',n1);
        First_map.put('afsdoo',n2);
        First_map.put('afs6yy',n3);  
        
        for(Account acc:list_1){
            system.debug(acc.Name);
            system.debug(acc.Industry);
        }
        
        for (Account accid:First_map.values()){
            system.debug(accid);
        }
    }
      
    
}