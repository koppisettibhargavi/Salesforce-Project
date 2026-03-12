public class BatchExample implements Database.Batchable<sObject> {
   
    public Database.Querylocator start(Database.BatchableContext bc){
        return Database.GetQueryLocator([select id from Account]);
    }
    
    public void execute(Database.BatchableContext bc ,List<Account> scope){
           List<Account> upd = new List<Account>();
           system.debug(scope.size());
           system.debug(new SheduledExample());
    } 
    public void Finish(Database.BatchableContext bc){
        system.debug('processed');
            }
}