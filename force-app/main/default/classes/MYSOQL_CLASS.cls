public class MYSOQL_CLASS {
    public List<Account> Parent_to_Child{get;set;}
    public List<Contact> Child_to_Parent{get;set;}
    public List<AggregateResult> aggList {get;set;}

    public Boolean Choice{get;set;}
    
    public MYSOQL_CLASS(){
      aggList=[Select StageName,COUNT(Id) from Opportunity Group by StageName limit 4];
    }    
    
     public void Parent_to_Child_Fun(){
        Parent_to_Child=[SELECT id,name,(select id,name from Contacts) FROM Account];
    }
    
    public void Child_to_Parent_Fun(){
        Child_to_Parent=[SELECT id,name,Account.id,Account.name from Contact];
    }  
    
}