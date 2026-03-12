public class FutureMethod {
    @future
    public static void countNumbers(List<Id> AccId){
        List<Account> accList=[SELECT Id,(SELECT Id FROM Contacts) FROM Account where Id IN: AccId];
        for(account acc:accList){
            acc.no_of_contacts__c=acc.Contacts.size();
        }
        system.debug([select id,no_of_contacts__c from Account]);
        update accList;
        system.debug('method Done');
    }
}


/*List<Account> Acclist=[SELECT ID FROM Account];
List <Id> newids=new List<Id>();
for (Account ass:Acclist){
    newids.add(ass.id);
}
FutureMethod.countNumbers(newids);*/