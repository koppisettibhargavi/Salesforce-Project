@RestResource(urlMapping='/orders/*')
global class OrderAPIOrgB {
    
    @HttpPost
    global static string receiveOrder(){
        system.debug('called api');
        String body =
            RestContext.request.requestBody.toString();

        List<Object> ordersStatus =
            (List<Object>)JSON.deserializeUntyped(body);
        system.debug('orders'+ordersStatus);

        List<Order> shipments =
            new List<Order>();

        for(Object obj : ordersStatus){

            Map<String,Object> orderData =
                (Map<String,Object>)obj;

            string orderid=(string)orderData.get('orderId');
            string orderStatus=(string) orderData.get('orderStatus');
            system.debug('orderid:-'+orderid);
            system.debug('orderstatus:-'+orderStatus);
            List<Order> ordlist = [SELECT Id, Status,Order_Status__c FROM Order WHERE Id = :orderId];
            system.debug('ordlist:'+ordlist);
            if(!ordlist.isEmpty()){
               ordlist[0].Order_Status__c = 'SAP Order Created';
               update ordlist;
             }
        }

        update shipments;
        return 'order created successfully';
    }
}