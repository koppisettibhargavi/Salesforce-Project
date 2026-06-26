@RestResource(urlMapping='/apiclass/')
global class ApiClass {
    @httpGet
    global static List<Account> getTopAccouns(){
        Map<String,String> paramsMap=RestContext.request.params;
        Set<Id>accids=new set<Id>();
        String accIndustry=paramsMap.get('Industry');
        List<Account>accountlist=[select id,industry,rating,annualrevenue from account Where Industry=:accIndustry];
        return accountlist;
    }
   /* @httpGet
    global static wrapperAccountClass getTopAccouns(){
        Map<String,String> paramsMap=RestContext.request.params;
        Set<Id>accids=new set<Id>();
        String accIndustry=paramsMap.get('Industry');
        List<Account>accountlist=[select id,industry,rating,annualrevenue from account Where Industry=:accIndustry];
        for(account acclistid:accountlist){
            accids.add(acclistid.id);
        }
        List<Contact>Contactlist=[select id,firstName,lastName,email from Contact where AccountId In:accids];
        List<Case>Caselist=[select id,priority,subject from Case where AccountId In:accids];
        wrapperAccountClass accwraper=new wrapperAccountClass();
        accwraper.accountlist=accountlist;
        accwraper.Contactlist=Contactlist;
        accwraper.Caselist=Caselist;
        return accwraper;
     }
    @httpPost
    global static string CreateAccount(String Name,String Rating,String Industry ){
        Account Acc=new Account();
        Acc.Name='created from Apex';
        Acc.Rating='hot';
        Acc.Industry='Banking';
        try{
            insert Acc;
            return 'Account created sucessfully from apexservices';
        }
        catch(exception e){
            return e.getMessage();
        }
    }
    global class wrapperAccountClass{
       global List<Account>accountlist;
       global List<Contact>Contactlist;
       global List<Case>Caselist;
    }
     
   /* @httpPost
    global static string CreateAccountandContact(wrapperAccountContactCreation information){
       Account accrecord=information.accountRecord;
       Contact conrecord=information.contactRecord;
        try{
            insert accrecord;
            conrecord.accountId=accrecord.id;
            insert conrecord;
            return 'Created Account and Contact';
        }
        catch(exception e){
            return e.getMessage();
        }
    }
    
    global class wrapperAccountContactCreation{
        global Account accountRecord{get;set;}
        global Contact contactRecord{get;set;}
    }
    
    @httpdelete
    
    global static string deleteClass(){
        Map<String,String> paramsMap=RestContext.request.params;
        String accountId=paramsMap.get('accId');
        List<Account>accountdeleteList=[select id from account Where id =:accountId];
        if(!accountdeleteList.isEmpty()){
            try{
            delete accountdeleteList;
            return 'Deleted Sucessfully';
        }
        catch(exception e){
            return e.getMessage();
        }
        }
        else{
            return 'Record Not Found';
        }
     }*/
}