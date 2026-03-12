public class QueueableExample implements Queueable {
    private List<Account> insertList;
    public QueueableExample(List<Account> appList){
        this.insertList=appList;
    }
    public void Execute(QueueableContext context){
        system.debug('insert done');
        insertfun();   
    }
    
    public void insertfun(){
        
        insert insertList; 
        
    }
}