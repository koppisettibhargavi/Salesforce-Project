@isTest
private class DailyLeadProcessorTest {

    @isTest
    static void testDailyLeadProcessor() {

        List<Lead> leadList = new List<Lead>();

        for(Integer i = 0; i < 200; i++) {

            leadList.add(
                new Lead(
                    LastName = 'Test Lead ' + i,
                    Company = 'Test Company'
                )
            );
        }

        insert leadList;

        Test.startTest();

        String cronExp = '0 0 0 1 1 ? 2099';

        System.schedule(
            'Daily Lead Processor Test',
            cronExp,
            new DailyLeadProcessor()
        );

        Test.stopTest();

        List<Lead> updatedLeads = [
            SELECT Id, LeadSource
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