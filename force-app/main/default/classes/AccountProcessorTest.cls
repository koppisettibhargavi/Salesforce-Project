@isTest
private class AccountProcessorTest {

    @isTest
    static void testCountContacts() {

        Account acc1 = new Account(
            Name = 'Account 1'
        );

        Account acc2 = new Account(
            Name = 'Account 2'
        );

        insert new List<Account>{acc1, acc2};

        List<Contact> contacts = new List<Contact>{

            new Contact(
                FirstName='John',
                LastName='Doe',
                AccountId=acc1.Id
            ),

            new Contact(
                FirstName='Jane',
                LastName='Doe',
                AccountId=acc1.Id
            ),

            new Contact(
                FirstName='Sam',
                LastName='Smith',
                AccountId=acc2.Id
            )
        };

        insert contacts;

        Test.startTest();

        AccountProcessor.countContacts(
            new List<Id>{acc1.Id, acc2.Id}
        );

        Test.stopTest();

        acc1 = [
            SELECT Number_Of_Contacts__c
            FROM Account
            WHERE Id=:acc1.Id
        ];

        acc2 = [
            SELECT Number_Of_Contacts__c
            FROM Account
            WHERE Id=:acc2.Id
        ];

        System.assertEquals(
            2,
            acc1.Number_Of_Contacts__c
        );

        System.assertEquals(
            1,
            acc2.Number_Of_Contacts__c
        );
    }
}