trigger IdAss on Account (before update,after insert,after update) {
    if(trigger.isupdate){
        if(trigger.isbefore){
            for (account acc:trigger.new){
                if(acc.AnnualRevenue>1000){
                    Account oldacc=trigger.oldmap.get(acc.id);
                    if(acc.Active__c!=oldacc.Active__c){
                       acc.Active__c=oldacc.Active__c;
                       acc.adderror('can not change');
                    }
                }
            }
        }
    }
    if(trigger.isinsert){
        if(trigger.isafter){
            list<Task> newtaskList=new list <Task>();
            list<Quote> newQuoteList=new list<Quote>();
            list<opportunity> newopportunityList=new list<opportunity>();
            for(Account acc:trigger.new){
                Task tk=new Task();
                tk.whatId=acc.id;
                tk.subject='from trigger';
                tk.status='completed';
                newtaskList.add(tk);
                
                opportunity opp=new opportunity();
                opp.name='from trigger';
                opp.AccountId=acc.id;
                opp.CloseDate = System.today();
                opp.StageName='closed won';
                newopportunityList.add(opp);
                
      
            }
            system.debug(newtaskList);
            insert newtaskList;
            
            insert newopportunityList;
            
            for(opportunity opp:newopportunityList){
                Quote q=new Quote();
                q.name='from trigger';
                q.OpportunityId=opp.id;
                q.Status = 'Draft';
                newQuoteList.add(q);
            }
            
            
            insert newQuoteList;    
            
        }
    }
    
}