trigger praticetrigger2 on Contact (after insert,after update) {
    if(Trigger.isinsert){
        if(Trigger.isafter){
            set<id> AccountIds=new set<id>();
            map<Id,contact> ContactMapwithNewVal=new map<Id,contact>();
            integer ContactCount=0;
            
            List<Account> ListToUpdateAccount=new List<Account>();
            for(Contact con:trigger.new){
                if(con.LeadSource=='web'){
                   AccountIds.add(con.AccountId);
                
                   ContactMapwithNewVal.put(con.Accountid,con);
                }
            }
            system.debug(ContactMapwithNewVal);
                   
            list<Contact> countContact=[select id,Account.Name from Contact where AccountId in:AccountIds];
            //list<Contact> relAccounts=[select id,AnnualRevenue from Account where Id in:ContactMapwithNewVal.keyset()];
            //for(Account Acc:relAccounts){
            // Acc.AnnualRevenue=ContactMapwithNewVal.get(Acc.Id).AnnualRevenue__c;
             //   ListToUpdateAccount.add(Acc);
              //  }
            
        
            ContactCount=countContact.size();
            list<Account> AccountList=[select id,AnnualRevenue from Account where id in:AccountIds];
            for(Account Acc:AccountList){
                Acc.description='it has Related relists: '+ContactCount;
                Acc.AnnualRevenue=ContactMapwithNewVal.get(Acc.Id).AnnualRevenue__c;
                ListToUpdateAccount.add(Acc);
                
                
            }
            update ListToUpdateAccount;
            
            
            
               
        }
    }
    
    if(trigger.isupdate){
        if(trigger.isafter){
            set<id> newids=new set<id>();
            for(contact con:trigger.new){
                if(con.Account.rating=='hot'){
                    newids.add(con.Accountid);
                }
            }
            
            list<Account> newlisttoupdate=[select name from Account where id in:newids];
            for(Account acc:newlisttoupdate){
                acc.rating='hot';
            }
            update newlisttoupdate;
        }
    }
}