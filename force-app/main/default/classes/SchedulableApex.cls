public class SchedulableApex Implements Schedulable {
    public void Execute(SchedulableContext cs){
        List<Account> Acclist=[select Id from Account Where rating=null];
        for (Account acc:Acclist){
            acc.rating='cold';
        } 
        Update Acclist;
    }
}