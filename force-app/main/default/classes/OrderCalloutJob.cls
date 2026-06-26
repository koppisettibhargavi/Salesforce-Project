public class OrderCalloutJob implements Queueable, Database.AllowsCallouts {

    List<Order_Created__e> events;

    public OrderCalloutJob(List<Order_Created__e> ev){
        events = ev;
    }

    public void execute(QueueableContext qc){
        WarehouseIntegration.sendOrders(events);
    } 
    
}