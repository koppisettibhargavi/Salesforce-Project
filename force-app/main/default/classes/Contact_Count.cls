public class Contact_Count {
    public static void totalContactCount(List<contact> ConList){
        system.debug(ConList.size());
        List<Account> AccList=new List<Account>();
        set<Id>AccIds=new set<Id>();
        for(Contact con:ConList){
            if(con.AccountId!=null){
                AccIds.add(con.AccountId);
                system.debug('done');
            }
        }
        system.debug('Accids'+AccIds);
        Integer Count=0;
        for(Account n:[select Id,Industry,(select id from contacts)from Account Where Id IN: AccIds]){
            system.debug('ncount'+n);
            n.no_of_contacts__c=n.contacts.size();
            if(n.Industry=='Banking'){
                Count++;
            }
            AccList.add(n);
            
        }
        system.debug('count'+Count);
        Update AccList;
        
    }
}