public class AccountPullCallout {

    public static void sendAccounts(){
        
        List<Account> accList = [SELECT Id, Name FROM Account LIMIT 1];
        List<Contact> conList = [SELECT Id, LastName FROM Contact LIMIT 1];
        List<Opportunity> oppList = [SELECT Id, Name, StageName, CloseDate FROM Opportunity LIMIT 10];

        DataWrapper wrapper = new DataWrapper();
        wrapper.accounts = accList;
        wrapper.contacts = conList;
        wrapper.opportunities = oppList;

        String requestBody = JSON.serialize(wrapper);

        String targetEndpoint = 
        'callout:myapi/services/apexrest/AccountData'; 
        // Replace with your target org endpoint

        HttpRequest req = new HttpRequest();
        req.setEndpoint(targetEndpoint);
        req.setMethod('POST');

        //req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        // Use a valid access token

        req.setHeader('Content-Type', 'application/json');

        req.setBody(requestBody);

        // To fetch the response from the target org
        Http http = new Http();
        HttpResponse res = http.send(req);

        System.debug('Response Body: ' + res.getBody());
        
        
    }
}