public class WarehouseIntegration implements Queueable, Database.AllowsCallouts {

    private List<Order_Created__e> events;

    // Constructor
    public WarehouseIntegration(List<Order_Created__e> events) {
        this.events = events;
    }

    // Queueable execution
    public void execute(QueueableContext qc) {

        try {
            List<Map<String,Object>> payload = 
                new List<Map<String,Object>>();

            for (Order_Created__e evt : events) {
                payload.add(new Map<String,Object>{
                    'orderId' => evt.OrderId__c,
                    'customerName' => evt.CustomerName__c,
                    'amount' => evt.Amount__c
                });
            }

            HttpRequest req = new HttpRequest();
            req.setEndpoint(
                'callout:myapi/services/apexrest/orders'
            );
            req.setMethod('POST');
            req.setHeader(
                'Content-Type',
                'application/json'
            );
            req.setBody(JSON.serialize(payload));

            Http http = new Http();
            HttpResponse res = http.send(req);

            insert new log__c(
                result__c =
                    'STATUS=' + res.getStatusCode() +
                    ' BODY=' + res.getBody()
            );

        } catch (Exception e) {

            insert new log__c(
                result__c = 
                    'ERROR=' + e.getMessage()
            );
        }
    }
}