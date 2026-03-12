trigger praticetriggers on Account (after update) {
    //auto deletion of child when parent got deleted
    if(trigger.isupdate){
        if(trigger.isafter){
             set<id>oldmapsids=trigger.oldmap.keyset();
             list<contact>newdata=[select id,name from contact where AccountId in :oldmapsids];
            // delete newdata;
        }
    }
    //auto update of child when parent got updated
    if(trigger.isupdate){
        if(trigger.isafter){
             map<id,string> newchanges=new map<Id,string>();
            for(account acc:trigger.new){
                if (acc.Active__c!=trigger.oldmap.get(acc.id).Active__c){
                    newchanges.put(acc.id,acc.Active__c);
                }
            } 
            List<Contact> changelist=new List<Contact>();
            for (contact con:[select id,accountid from contact where accountid in :newchanges.keyset()]){
                con.Active_status_Acc__c=newchanges.get(con.accountid);
                changelist.add(con);
            }
            update changelist;
        }   
    }
    
    //Auto Count Update of Parent when child got updated
    // this trigger should be on contacts
   /* if(trigger.isupdate){
        if(trigger.isbefore){
            list<Account>UpdatedList=new list<Account>();
            set<Id> newsetids=new set<Id>();
            for(contact con:trigger.new){
                newsetids.add(con.accountid);
            }
            for (Account acc:[select name,(select id from Contacts) from Account where id in :newsetids]){
                acc.no_of_contacts__c=acc.Contacts.size();
                updatedList.add(acc);
            }
            update UpdatedList;
        }
        
    } */
    
    if(trigger.isdelete){
        if(trigger.isbefore){
            set<id> newidslist= new set<id>();
            for(Account acc:trigger.old){
                newidslist.add(acc.id);
            }  
            
            list<Account> newAccidshavingcontacts=[select name from Account where id in (select Accountid from contact)];
                for(account acc:newAccidshavingcontacts){
                   acc.adderror('cant delete this');
                }
        }
    }
}