public without sharing class AutoDelete {
    Public Static Void AfterDelete(map<Id,Account> oldmap){
        set<id> oldMapsids=oldmap.keyset();
        list <Contact> newdata=[select id,name from contact Where AccountId  in :oldMapsids];
        delete newdata; 
    }
}