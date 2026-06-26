public class DeleteDataTable {
    @AuraEnabled
    public static void getDelete(List<Account> acclist){
        List<Account> deletedrecords=[select id,name from account];
        system.debug('acclist'+acclist);
        system.debug('deletedrecords'+deletedrecords);
        delete acclist;
    }
    
}