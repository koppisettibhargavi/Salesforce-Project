@isTest
private class LeadProcessorTest {

    @isTest
    static void testLeadProcessor() {

        List<Lead> leads = new List<Lead>();

        for(Integer i = 0; i < 200; i++) {

            leads.add(
                new Lead(
                    LastName = 'Lead ' + i,
                    Company = 'Test Company'
                )
            );
        }

        insert leads;

        Test.startTest();

        LeadProcessor batchJob = new LeadProcessor();

        Database.executeBatch(batchJob, 200);

        Test.stopTest();

        List<Lead> updatedLeads = [
            SELECT LeadSource
            FROM Lead
        ];

        System.assertEquals(200, updatedLeads.size());

        for(Lead l : updatedLeads) {
            System.assertEquals(
                'Dreamforce',
                l.LeadSource
            );
        }
    }
}