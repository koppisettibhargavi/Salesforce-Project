public class accountclass {
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountdata(string acckey){
        list<Account> AccData=[select id,Name,industry from Account where Name like :'%'+acckey+'%'];
        system.debug(AccData);
        return AccData;
    }
    
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccount(){
        list<Account> AccData=[select id,Name,industry from Account];
        system.debug(AccData);
        return AccData;
    }
}