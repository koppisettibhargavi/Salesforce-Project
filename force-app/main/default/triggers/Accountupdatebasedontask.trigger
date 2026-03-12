trigger Accountupdatebasedontask on Task (after update) {
    if(trigger.isupdate){
        if(trigger.isafter){
            map<id,string> AccountIds=new map<id,string>();
            String strPr=Account.SobjectType.getDescribe().getKeyPrefix();
            for(Task ts:trigger.new){
                if(ts.WhatId != null && String.valueOf(ts.WhatId).startsWith(strPr)){
                   AccountIds.put(ts.WhatId,ts.Status);
                }
            }
            system.debug('taskids'+AccountIds);
            list<Account> AccountlisttoTask=[select id,StageName__c from Account where id in:AccountIds.keyset()];
            system.debug('idstoupdate'+AccountlisttoTask);
            
            for(Account acc:AccountlisttoTask){
                acc.StageName__c=AccountIds.get(acc.id);
                system.debug('acc'+acc);
            }
            update AccountlisttoTask;
            
        }
    }
}