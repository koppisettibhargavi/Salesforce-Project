public class AccountProcessor {

    @future
    public static void countContacts(List<Id> accountIds) {

        List<Account> accountsToUpdate = new List<Account>();

        for (AggregateResult ar : [
            SELECT AccountId accId, COUNT(Id) conCount
            FROM Contact
            WHERE AccountId IN :accountIds
            GROUP BY AccountId
        ]) {

            accountsToUpdate.add(
                new Account(
                    Id = (Id) ar.get('accId'),
                    Number_Of_Contacts__c = (Integer) ar.get('conCount')
                )
            );
        }

        if (!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
        }
    }
}