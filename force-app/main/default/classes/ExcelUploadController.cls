public with sharing class ExcelUploadController {

    @AuraEnabled
    public static String uploadAccounts(String jsonData) {
        List<Object> rows =(List<Object>)JSON.deserializeUntyped(jsonData);
        Set<String> names = new Set<String>();
        for(Object obj : rows) {
        Map<String,Object> row =(Map<String,Object>)obj;
            names.add((String)row.get('Name'));
        }
        List<Account> duplicates = [SELECT Name FROM Account WHERE Name IN :names];
        
        Map<String, Account> existingAccounts = new Map<String, Account>();
        list<Account>duplicatelisttoshow=new list<Account>();
        for(Account acc : duplicates) {
            existingAccounts.put(acc.Name, acc);
        }
        List<Account> accList = new List<Account>();
   
        for(Object obj : rows) {
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
           
        }             
        string DuplicateStatus='';
        list<string>newDupVal=new list<string>();
        for(account acc:duplicates){
            newDupVal.add(acc.name);
        }
        if(!duplicates.isEmpty()) {
             DuplicateStatus= 'Duplicate Account Found: ' + String.join(newDupVal, ', ');
              Messaging.SingleEmailMessage mail =
                new Messaging.SingleEmailMessage();

            mail.setToAddresses(
                new String[] {'koppisettibhargavi4@gmail.com'}  
            );mail.setSubject('Duplicate Account Found');

            mail.setPlainTextBody(
                'Duplicate Accounts Found: '+DuplicateStatus
            );

            Messaging.sendEmail(
                new Messaging.SingleEmailMessage[] {mail}
            );
        }
        id jobId=Database.ExecuteBatch(new AccountUploadBatch(jsonData),20);
        
        return DuplicateStatus;
        
    }
        
}