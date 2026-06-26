public class paginationclass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsKeyset(Id lastId, Integer pageSize,Id firstId) {

        if (lastId == null) {
            return [
                SELECT Id, Name,Industry,Phone,Rating
                FROM Account
                ORDER BY Id
                LIMIT :pageSize
            ];
        } 
        else if(firstId!=null){
            return [
                SELECT Id,Name,Industry,Phone,Rating
                FROM Account
                WHERE Id >= :firstId
                ORDER BY Id
                LIMIT :pageSize
            ];
        }
        
        else {
            system.debug([
                SELECT Id,Name,Industry,Phone,Rating
                FROM Account
                WHERE Id > :lastId
                ORDER BY Id
                LIMIT :pageSize
            ]);
            return [
                SELECT Id,Name,Industry,Phone,Rating
                FROM Account
                WHERE Id > :lastId
                ORDER BY Id
                LIMIT :pageSize
            ];
        }
    }
        @AuraEnabled(cacheable=true)
        public static List<Account> KeywordSearch(string keywordval){
            system.debug([select Id, Name,Industry,Phone,Rating from Account where Name like :('%' + keywordval + '%')]);
            return [select Id, Name,Industry,Phone,Rating from Account where Name like :('%' + keywordval + '%')];
        }
     public static List<Account> getAccountsKeysetpre(Id lastId, Integer pageSize) {

         return [
                SELECT Id,Name,Industry,Phone,Rating
                FROM Account
                WHERE Id < :lastId
                ORDER BY Id
                LIMIT :pageSize
            ];
        
    }

}