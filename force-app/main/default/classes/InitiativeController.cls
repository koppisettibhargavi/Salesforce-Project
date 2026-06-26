public class InitiativeController {
    @AuraEnabled(cacheable=true)
    public static List<user> searchRecords(String searchText) {
        system.debug('searchkey'+searchText);
        return [SELECT Id, Name,Email FROM User WHERE Name LIKE :(searchText + '%') LIMIT 5];
    }
}