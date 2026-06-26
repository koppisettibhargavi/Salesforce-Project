public class OracleCPQIntegration {
     @AuraEnabled
     public static void testConnection() {
         
        Http http = new Http();
        HttpRequest request = new HttpRequest();
 
        request.setEndpoint(
            'https://gcctraining-xerox.bigmachines.com/rest/v17/commerceDocumentsCPQProcessTransaction/67198572'
        );
 
        request.setMethod('GET');
 
        String username = 'raju1117';
        String password = 'Raju@2003';
 
        Blob headerValue = Blob.valueOf(username + ':' + password);
 
        String authorizationHeader =
            'Basic ' + EncodingUtil.base64Encode(headerValue);
 
        request.setHeader('Authorization', authorizationHeader);
 
        request.setHeader('Content-Type', 'application/json');
 
        HttpResponse response = http.send(request);
 
        System.debug('STATUS: ' + response.getStatus());
        System.debug('BODY: ' + response.getBody());
        
    }
}