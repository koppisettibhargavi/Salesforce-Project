public class Soql_Vf {
    public List<Account> MySoqlList{get;set;}
    public Soql_Vf(){
        MySoqlList=[SELECT Fax,Phone,Website,Rating,AccountNumber FROM Account];
        system.debug(MySoqlList);
    }
}