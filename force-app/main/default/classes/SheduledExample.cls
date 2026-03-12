public class SheduledExample implements Schedulable{
    
    public void Execute(SchedulableContext sc){
        System.debug('I am Shedulable');
    }

}