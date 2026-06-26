public class Datableclass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(Id lastRecordId) {

        // First load
        if(lastRecordId == null) {
            return [
                SELECT Id,
                       Name,
                       Industry,
                       Phone,
                       Rating
                FROM Account
                ORDER BY Id
                LIMIT 10
            ];
        }

        // Next batch
        return [
            SELECT Id,
                   Name,
                   Industry,
                   Phone,
                   Rating
            FROM Account
            WHERE Id > :lastRecordId
            ORDER BY Id
            LIMIT 10
        ];
    }
    @AuraEnabled(cacheable=true)
    public static list<contact> getContact(){
       return [select Id,lastName,Phone,AccountId,Account.Name,Account.Rating from contact];
    }
}