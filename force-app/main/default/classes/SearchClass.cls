public class SearchClass {
    @AuraEnabled(cacheable=true)
    public static list<Account>getSearchData(string accname){
          return [select name,phone,industry from Account where name like:accname];
    }
}