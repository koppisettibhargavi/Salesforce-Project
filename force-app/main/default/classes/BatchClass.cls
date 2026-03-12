public class BatchClass implements Database.Batchable<sobject>,Database.stateful {
    public integer recordCount=0;
    public  List<Account> opplist;
    Public BatchClass(List<Account> Acclist){
        this.opplist=Acclist;
    }
    
    public database.QueryLocator start(Database.BatchableContext bc){
         newmeth();
         return Database.GetQueryLocator([SELECT ID,Leadsource FROM opportunity]);
    } 
    public void execute(Database.BatchableContext bc,List<opportunity> opps){
        for (opportunity opp:opps){
            opp.LeadSource='Phone Inquiry';
            opp.Approval_Status__c='Pending';
        }
        update opps;  
        recordCount=recordCount+opps.size();
        
    } 
    																																																									
    public void finish(Database.BatchableContext bc){
        system.debug('processed Record Count'+recordCount);
    }  
    
    public void newmeth(){
        system.debug('size of'+opplist.size());
    }
}

//BatchClass newBatch=new BatchClass();
//Id batchId=Database.executeBatch(newBatch);