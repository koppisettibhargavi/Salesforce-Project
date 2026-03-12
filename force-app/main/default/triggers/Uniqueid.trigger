trigger Uniqueid on Account (before insert,after update,after insert) {
    if(trigger.isinsert){
        if(trigger.isbefore){
           list<Account>listtobeupdated=new list<Account>();
            
//for(account acc:[select id,serial_number__c from account]){
  // if(acc.serial_number__c==null){
   //      acc.serial_number__c=1;
   // }
   // else{
   //      acc.serial_number__c+=1;   
   //     }
   // listtobeupdated.add(acc);
//}
//update listtobeupdated;
            decimal max_serial;
            AggregateResult newresult=[select max(serial_number__c) from Account];
            system.debug(newresult);
            if(newresult.get('expr0')==null){
                max_serial=0;
            }
            else{
                max_serial=(decimal) newresult.get('expr0');
            }
            
        
        for (Account accNew : Trigger.new) {
            max_serial = max_serial + 1;
            accNew.serial_number__c = max_serial;
            
          } 
        }
    }
    if(trigger.isupdate){
        if(trigger.isafter){
            set<id>newsetids=new set<id>();
            for(Account acc:trigger.new){
                newsetids.add(acc.id);
            }
            
            list<Contact> contact_rel_Account=[select id,email from contact where Accountid in :newsetids];
            system.debug(newsetids);
            for (contact acc:contact_rel_Account){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[] {acc.email}; 
                mail.setToAddresses(toAddresses);
                mail.setSenderDisplayName('Salesforce Support');
                mail.setSubject('updates done on : ' +acc.id );
                mail.setPlainTextBody('Your parent: ' + acc.Id +' has been updated.');
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
                system.debug('email was sent');
            }

        }
    }
    if(trigger.isinsert){
        if(trigger.isafter){
            AccountPullCallout.sendAccounts();
        }
    }
    
}