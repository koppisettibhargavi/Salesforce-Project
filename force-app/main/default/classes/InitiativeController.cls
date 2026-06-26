public class InitiativeController {
    @AuraEnabled(cacheable=true)
    public static List<user> searchRecords(String searchText) {
        system.debug('searchkey'+searchText);
        return [SELECT Id, Name,Email FROM User WHERE Name LIKE :(searchText + '%') LIMIT 5];
    }
    @AuraEnabled(cacheable=true)
    public static List<user> searchRecordsuser(String searchText) {
        system.debug('searchkey'+searchText);
        return [SELECT Id, Name,Email FROM User WHERE Name LIKE :(searchText + '%') LIMIT 5];
    }
    @AuraEnabled
    public static void addMember(string name,Id initiativeId,Id userId,String discipline,Decimal allocation)
    {
         system.debug(initiativeId);
         system.debug(userId);
         system.debug(discipline);
         system.debug(allocation);
         TeamMember__c member = new TeamMember__c();
        
         member.Name = name;
         member.Initiative__c = initiativeId;
         member.OwnerId = userId;  
         member.Discipline__c = discipline;
         member.Resource_Time_Allocation__c = allocation;

        insert member;
        system.debug(member);
     }
    
    @AuraEnabled(cacheable=true)
    public static List<TeamMember__c> getTeamMembers() {

       return [
          SELECT Id,
               Name,
               Team_Members_Name__c,
               Discipline__c,
               OwnerId,
               Owner.Name,
               Initiative__c,
               Initiative__r.Name,
               Resource_Time_Allocation__c
         FROM TeamMember__c
     ];
  }
    @AuraEnabled
    public static void deleteRecord(Id teamMemberId){

       TeamMember__c tm = [
          SELECT Id
          FROM TeamMember__c
          WHERE Id = :teamMemberId
          LIMIT 1
       ];

     delete tm;
   }
    
    
    
    
    @AuraEnabled(cacheable=true)
    public static List<Initiatives__c> getUserOwnedRecords(Id selectedUserId) {
           return [
                 SELECT Id,
                   Name,
                   Phase__c,
                   (SELECT Id FROM TeamMembers__r)
                 FROM Initiatives__c
                 WHERE OwnerId = :selectedUserId
           ];
     }
    @AuraEnabled(cacheable=true)
    public static List<User> getUsers() {
    
       return [
          SELECT Id, Name
          FROM User
          WHERE IsActive = true
          ORDER BY Name
      ];
   } 
    
    @AuraEnabled
    public static void transferMember(
      Id teamMemberId,
      Id newUserId) {
     try {

        TeamMember__c member = [
            SELECT Id, OwnerId
            FROM TeamMember__c
            WHERE Id = :teamMemberId
            LIMIT 1
        ];

        member.OwnerId = newUserId;

        update member;

    } 
     catch (Exception e) {

        throw new AuraHandledException(e.getMessage());
    }
   }
    
}