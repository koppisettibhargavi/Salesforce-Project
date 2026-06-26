public class DataTable {
    @AuraEnabled(cacheable=true)
    public static list<Account>getdataTable(){
        return[select Name,Id,Industry,Phone,email__c from Account limit 20];
    }
}