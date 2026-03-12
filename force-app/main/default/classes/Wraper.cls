public class Wraper {
    public static List<AccountWrapperList> getAccountwithContact(){
        List<AccountWrapperList>WrapperList=new list<AccountWrapperList>();
        List<Account>Acclist=[select Id,Name,(select Id,Name from contacts) from Account];
        
        for (Account newAcc:Acclist){
            WrapperList.add(new AccountWrapperList(newAcc,newAcc.contacts));
           
        }
        
        return WrapperList;
    }  
    
    public class AccountWrapperList{
        public Account Accrecord{get;set;}
        public List <Contact> contactList{get;set;}
        public AccountWrapperList(Account Accrecord,List<Contact> contactList){
            this.Accrecord=Accrecord;
            this.contactList=contactList;
        }
        
    }
}