public with Sharing class SearchComponent {
    @AuraEnabled(cacheable=true)
    public static list<Account> getsearchData(){
        return[select id,name from Account limit 5];
    } 
    @AuraEnabled(cacheable=true)
    public static list<Account> getsearchDatafunapi(string searchText){
        system.debug('searchText'+searchText);
        return[select id,name from Account where name like:searchText limit 5];
    }
}