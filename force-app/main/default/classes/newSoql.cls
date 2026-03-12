public class newSoql {
    public List<Account> MySoqlList{get;set;}
    
    public void show(){
        MySoqlList=[SELECT Fax,Phone,Website,Rating,AccountNumber FROM Account];
    }  
}