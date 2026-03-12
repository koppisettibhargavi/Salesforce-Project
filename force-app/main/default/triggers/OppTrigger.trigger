trigger OppTrigger on Opportunity (after Update) {
    if(Trigger.isUpdate){
        if(Trigger.isafter){
            if(!PreventRecursion.firstcall){
               PreventRecursion.firstcall=true;
                oppHandler.updateDesc(Trigger.New,Trigger.oldMap);
           } 
            set<id>newids=new set<id>();
            for(Opportunity opp:trigger.new){
                newids.add(opp.AccountId);
            }
            map<id,Decimal> newoppids=new map<id,Decimal>();
            list<Opportunity> oppids_Account=[select AccountId,Amount from Opportunity where AccountId in:newids];
            for(Opportunity oppa:oppids_Account){
                if(!newoppids.containskey(oppa.id)){
                    newoppids.put(oppa.id,0);
                }   
                newoppids.put(oppa.Id, newoppids.get(oppa.Id) + newoppids.get(oppa.Id));

            } 
            system.debug(newoppids);
            list<Account>listtobeupdated=new list<account>();
            for(id accid:newoppids.keyset()){
            Account a1=new account(id=accid,AnnualRevenue=newoppids.get(accid));
            listtobeupdated.add(a1); 
            }
           update listtobeupdated;
       }
    }
}