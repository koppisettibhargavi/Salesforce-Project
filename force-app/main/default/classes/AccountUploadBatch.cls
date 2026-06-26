public class AccountUploadBatch implements Database.Batchable<Object>, Database.Stateful {
    integer count=0;
    private String jsonData;

    public AccountUploadBatch(String jsonData) {
        this.jsonData = jsonData;
    }

    public Iterable<Object> start(Database.BatchableContext bc) {

        return (List<Object>)JSON.deserializeUntyped(jsonData);
    }

    public void execute(Database.BatchableContext bc, List<Object> scope) {
        Set<String> accountNames = new Set<String>();
        for(Object obj : scope) {
           Map<String, Object> row = (Map<String, Object>)obj;
           String accName = (String)row.get('Name');
           if(accName != null) {
             accountNames.add(accName);
           }
        }
        Map<String, Account> existingAccounts = new Map<String, Account>();
        list<Account>duplicatelisttoshow=new list<Account>();
        for(Account acc : [SELECT Id, Name FROM Account WHERE Name IN :accountNames]) {
            existingAccounts.put(acc.Name, acc);
        }
        List<Account> accList = new List<Account>();
        system.debug('scope'+scope);
        for(Object obj : scope) {
            Map<String, Object> row =(Map<String, Object>)obj;
            String accName = (String)row.get('Name');
            Account acc = new Account();
            if(!existingAccounts.containsKey(accName)) { 
               acc.Name = accName;
               acc.Phone = String.valueOf(row.get('Phone'));
               acc.Industry = (String)row.get('Industry');
               acc.Rating = (String)row.get('Rating');
               accList.add(acc);
             }
            else{
                
            }
          }

        if(!accList.isEmpty()) {
            insert accList;
        }
        
        count+=scope.size();
    }

    public void finish(Database.BatchableContext bc) {
        System.debug('Account upload completed'+count);
        AsyncApexJob job = [
        SELECT Id,
               Status,
               NumberOfErrors,
               JobItemsProcessed,
               TotalJobItems
        FROM AsyncApexJob
        WHERE Id = :bc.getJobId()
    ];

    System.debug('Status: ' + job.Status);
    System.debug('Errors: ' + job.NumberOfErrors);
        System.debug('JobItemsProcessed: ' + job.JobItemsProcessed);
        System.debug('TotalJobItems: ' + job.TotalJobItems);
        if(job.NumberOfErrors > 0) {

            Messaging.SingleEmailMessage mail =
                new Messaging.SingleEmailMessage();

            mail.setToAddresses(
                new String[] {'koppisettibhargavi4@gmail.com'}  
            );

            mail.setSubject('Batch Job Failed');

            mail.setPlainTextBody(
                'Batch Status: ' + job.Status +
                '\nErrors: ' + job.NumberOfErrors +
                '\nProcessed: ' + job.JobItemsProcessed +
                '\nTotal: ' + job.TotalJobItems
            );

            Messaging.sendEmail(
                new Messaging.SingleEmailMessage[] {mail}
            );
        }
    }
        
    
}