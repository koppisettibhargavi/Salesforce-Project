public class DataTypes {
    public static void Sobjectexample(string name,string rating,string NextStep,decimal amount){
        Account acc=new Account();
        acc.name=name;
        acc.rating=rating;
        system.debug(acc); 
        
        
        Opportunity opp=new Opportunity();
        opp.name=name;
        opp.NextStep=NextStep;
        opp.Amount=amount;
        system.debug(opp);
    } 
    
    public void Listexample(){
        List <String>newone=new List<String>();
        newone.add('one');
        newone.add('rose');
        //system.debug(newone); 
        
        list <Account> secondone=new list<Account>();
        Account a1=new Account(name='ram',rating='cold');
        secondone.add(a1);
        secondone.add(a1);
        //system.debug(secondone); 
        secondone.add(1,a1); 
        list <Account> second=new list<Account>{
            new account(name='ram',rating='hot'),new account(name='ram',rating='hot')
        };
        Account a2=new Account(name='ran',rating='hot');
        second.add(a2); 
        second.addAll(secondone);
        
        set<string> newset=new set<String>();
        newset.add('green');
        //system.debug(newone);
        newone.addAll(newset);
        List <String>newother=new List<String>();
        newother=newone.clone();
        //system.debug(newother);
        //system.debug(newother.contains('rose'));
        system.debug(newone.equals(newother));
        
    }
}