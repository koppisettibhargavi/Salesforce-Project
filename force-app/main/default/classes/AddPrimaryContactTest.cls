@isTest
public class AddPrimaryContactTest{

    @isTest
    static void testAddPrimaryContact() {

        List<Account> accounts = new List<Account>();

        // 50 NY Accounts
        for(Integer i = 0; i < 50; i++) {
            accounts.add(
                new Account(
                    Name = 'NY Account ' + i,
                    BillingCountryCode = 'US',
                    BillingStateCode = 'NY'
                )
            );
        }

        // 50 CA Accounts
        for(Integer i = 0; i < 50; i++) {
            accounts.add(
                new Account(
                    Name = 'CA Account ' + i,
                    BillingCountryCode = 'US',
                    BillingStateCode = 'CA'
                )
            );
        }

        insert accounts;

        Contact contactTemplate = new Contact(
            FirstName = 'Primary',
            LastName = 'Contact'
        );

        Test.startTest();

        AddPrimaryContact job = new AddPrimaryContact(
            contactTemplate,
            'California'
        );

        System.enqueueJob(job);

        Test.stopTest();

        List<Contact> insertedContacts = [
            SELECT Id, AccountId
            FROM Contact
            WHERE FirstName = 'Primary'
            AND LastName = 'Contact'
        ];

        System.assertEquals(50, insertedContacts.size());

        Set<Id> caAccountIds = new Set<Id>();

        for(Account acc : [
            SELECT Id
            FROM Account
            WHERE BillingStateCode = 'CA'
        ]) {
            caAccountIds.add(acc.Id);
        }

        for(Contact con : insertedContacts) {
            System.assert(
                caAccountIds.contains(con.AccountId),
                'Contact should be related to a CA account'
            );
        
    }
}
}