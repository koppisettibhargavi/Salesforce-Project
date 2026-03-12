trigger PraticeTrigger1 on Account (before insert,before update,after insert,after delete) {
    if(trigger.isinsert){
        if(trigger.isbefore){
            list<Account> AccountWithOutIds=[select id,CreatedDate,count__c from Account order by CreatedDate];
            list<Account> AccountListToUpdate=new list<Account>();
            if(!AccountWithOutIds.isEmpty()){
                decimal count=0;
                for(Account acc:AccountWithOutIds){
                    system.debug(acc);
                    if(acc.count__c==null){
                       acc.count__c=count+1;
                       AccountListToUpdate.add(acc);
                       count+=1;
                     }
                 }
                system.debug('updatedlist:'+AccountListToUpdate);
                update AccountListToUpdate;
            }
            
            
            
            decimal max_serial;
            AggregateResult newresult=[select max(count__c) from Account];
            system.debug(newresult);
            if(newresult.get('expr0')==null){
                max_serial=0;
            }
            else{
                max_serial=(decimal) newresult.get('expr0');
            }
            
            for(Account acc:trigger.new){
                max_serial = max_serial + 1;
                acc.count__c = max_serial;
                acc.name='from Tigger'+max_serial;
                acc.description='from trigger';
            }
            
        }  
    }
    
    if(trigger.isdelete){
        if(trigger.isafter){
             list<Account> AccountWithOutIds=[select id,CreatedDate,count__c from Account order by CreatedDate];
            list<Account> AccountListToUpdate=new list<Account>();
            if(!AccountWithOutIds.isEmpty()){
                decimal count=0;
                for(Account acc:AccountWithOutIds){
                    system.debug(acc);
                       acc.count__c=count+1;
                       acc.name='from Tigger'+acc.count__c;
                       AccountListToUpdate.add(acc);
                       count+=1;
                     
                 }
                system.debug('updatedlist:'+AccountListToUpdate);
                update AccountListToUpdate;
            }
            
           
        }  
     }
    
    if(trigger.isupdate){
        if(trigger.isbefore){
            for (account acc:trigger.new){
                if(acc.AnnualRevenue>1000){
                    Account oldacc=trigger.oldmap.get(acc.id);
                    if(acc.Active__c!=oldacc.Active__c){
                       acc.Active__c=oldacc.Active__c;
                       acc.adderror('can not change');
                    }
                }
            }
        }
    }
    
    if(trigger.isinsert){
        if(trigger.isafter){
            list<Contact> inserationContactIds=new list<Contact>();
            for(Account acc:trigger.new){
                contact newContact=new contact(Accountid=acc.id,LastName=acc.name);
                inserationContactIds.add(newContact);
            }
            insert inserationContactIds;
        }
    }
}