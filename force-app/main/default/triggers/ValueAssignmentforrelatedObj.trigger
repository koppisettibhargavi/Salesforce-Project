trigger ValueAssignmentforrelatedObj on Account (before update,after update) {
    if(trigger.isupdate){
        if(trigger.isbefore){
            set<id>Accountids=new set<id>();
            for(Account acc:trigger.new){
                if(acc.name=='Hot'&& acc.Active__c=='true'){
                    Accountids.add(acc.Id);
                  }
                    
            }
           
            List<contact> currentAccountContact=[select Accountid,name,LeadSource from contact where Accountid in :Accountids];
            for(contact con:currentAccountContact){
                con.LeadSource=trigger.newmap.get(con.Accountid).LeadSource__c;
            }
            update currentAccountContact;
        }
    }
    
    if(trigger.isupdate){
        if(trigger.isafter){
            map<id,Decimal> valueMap=new map<id,Decimal>();
            for (Account acc:trigger.new){
                if(acc.AnnualRevenue!=trigger.oldmap.get(acc.id).AnnualRevenue){
                   valueMap.put(acc.id,acc.AnnualRevenue);
                }
                
            list<Contact> relatedList=[select id,AnnualRevenue__c,AccountId from contact where AccountId In:valueMap.keyset()];
                for(Contact con:relatedList){
                    con.AnnualRevenue__c=valueMap.get(con.AccountId);
                }
                
            }
        }
    }
}