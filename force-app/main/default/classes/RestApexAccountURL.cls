@RestResource(urlMapping='/AccountData/*')
global with sharing class RestApexAccountURL {
    
    global class DataWrapper {
        public List<Account> accounts;
        public List<Contact> contacts;
        public List<Opportunity> opportunities;
    }

    @HttpPost
    global static String receiveAccounts() {

        System.debug('Received response ' + RestContext.request.requestBody.toString());

        String body = RestContext.request.requestBody.toString();
        

        DataWrapper wrapper = 
        (DataWrapper)JSON.deserialize(body, DataWrapper.class);

        if(wrapper.accounts != null){
            for(Account acc : wrapper.accounts){
                acc.Id = null;
            }
            insert wrapper.accounts;
        }

        if(wrapper.contacts != null){
            for(Contact con : wrapper.contacts){
                con.Id = null;
            }
            insert wrapper.contacts;
        }

        if(wrapper.opportunities != null){
            for(Opportunity opp : wrapper.opportunities){
                opp.Id = null;
            }
            insert wrapper.opportunities;
        }
        
        system.debug(body);

        return 'Records inserted successfully';
    }
}