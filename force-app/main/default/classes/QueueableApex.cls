public class QueueableApex implements Queueable{
    private List<Account> acclist;
    private Id ParentAccId;
    
    public QueueableApex(List<Account> acclist,Id AccId){
        this.acclist=acclist;
        this.ParentAccId=AccId;
    }  
   /* public void Execute(QueueableContext context){
        for (Account acc:acclist){
            acc.ParentId=ParentAccId;
        }    
        update acclist;
        system.debug('done');
    } */
   public void Execute(QueueableContext context){
       system.debug('done1');
       Exe();
    }
    public void Exe(){
       system.debug('acclist'+acclist);
    }
    
    

}

/*List<Account> Acclist=[select Id from Account Where BillingState='NY'];
Id parentId=[select Id from Account where name='ram'][0].id;
QueueableApex updatejob=new QueueableApex(Acclist,parentId);
Id JobId=system.Enqueuejob(updatejob);*/