public class Arrays {
    public Account[] accuracy {get;set;}
    
    
    public Arrays(){
        Account a1=new Account(name='acc1',rating='Hot',Industry='Bnaking');
        Account a2=new Account(name='acc2',rating='Cold',Industry='Energy');
        Account a3=new Account(name='acc3',rating='Hot',Industry='HealthCare');
        accuracy=new Account [] {a1,a2,a3};
        
    }
   
}