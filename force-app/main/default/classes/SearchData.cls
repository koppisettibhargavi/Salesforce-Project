public with Sharing class SearchData {
    @AuraEnabled(cacheable=true)
    public static list<Account> getsearchDatafun(string accname){
        system.debug(accname);
        try{
            if(string.isEmpty(accname)){
                system.debug([select id,name from Account]);
                return [select id,name from Account];
            }
            else{
                String searchKey = '%' + accname.trim() + '%';
                system.debug('apex data'+ [select id,name,Phone,Industry,type from Account where name like :searchKey LIMIT 5]);
                return[select id,name,Phone,Industry,type from Account where name like :searchKey LIMIT 5];
            }
        }
        catch(Exception e){
             throw new AuraHandledException(e.getmessage());
        }
    }

}