public class AddPrimaryContact implements Queueable {

    private Contact contactRecord;
    private String state;

    public AddPrimaryContact(Contact contactRecord, String state) {
        this.contactRecord = contactRecord;
        this.state = state;
    }

    public void execute(QueueableContext qc) {

        List<Account> accounts = [
            SELECT Id
            FROM Account
            WHERE BillingState = :state
            LIMIT 200
        ];

        List<Contact> contactsToInsert = new List<Contact>();

        for(Account acc : accounts) {

            Contact c = contactRecord.clone();

            c.AccountId = acc.Id;

            contactsToInsert.add(c);
        }

        if(!contactsToInsert.isEmpty()) {
            system.debug('contactsToInsert'+contactsToInsert);
            insert contactsToInsert;
        }
    }
}