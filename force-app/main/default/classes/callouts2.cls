public class callouts2 {
  public static void getAccounts() {

        Http http = new Http();
        HttpRequest request = new HttpRequest();

        // Use Named Credential
        request.setEndpoint('callout:SFDCConnection/services/apexrest/apiclass/');
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json');

        HttpResponse response = http.send(request);

        System.debug('Status Code: ' + response.getStatusCode());
        System.debug('Response Body: ' + response.getBody());
    }
}