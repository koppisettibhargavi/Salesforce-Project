public class differentoptionsforusers {
    @AuraEnabled(cacheable=true)
    public static List<String> getFilteredValuesforAccount() {

        User u = [SELECT Profile.Name FROM User WHERE Id = :UserInfo.getUserId()];

        List<String> values = new List<String>();

        if(u.Profile.Name == 'Standard User'){
            values.add('Agriculture');
            values.add('Apparel');
            values.add('Banking');
            values.add('Biotechnology');
        } else if(u.Profile.Name == 'System Administrator'){
            values.add('Finance');
            values.add('Government');
            values.add('Healthcare');
            values.add('Manufacturing');
        }

        return values;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<String> getFilteredValues() {

        User u = [SELECT Profile.Name FROM User WHERE Id = :UserInfo.getUserId()];

        List<String> values = new List<String>();

        if(u.Profile.Name == 'Sales User'){
            values.add('Prospecting');
            values.add('Negotiation');
        } else if(u.Profile.Name == 'System Administrator'){
            values.add('Closed Won');
            values.add('Closed Lost');
        }

        return values;
    }
    
    @AuraEnabled(cacheable=true)
    public static String getCurrentProfile() {

           User u = [
               SELECT Profile.Name 
               FROM User 
               WHERE Id = :UserInfo.getUserId()
             ];

         if (u.Profile.Name == 'Sales User') {
             return 'Sales User';
          } 
        else if (u.Profile.Name == 'System Administrator') {
             return 'System Administrator';
         }

        return u.Profile.Name; // default return
       }
    
    @AuraEnabled(cacheable=true)
    public static String getAccountsByProfilefields() {
     
    //Get current user profile Id (NO SOQL needed)
    Id profileId = UserInfo.getProfileId();
    String fields = 'Id, Name';
    //  Map ProfileId → Fields (ADD ALL YOUR PROFILES HERE)
    Map<Id, String> profileFieldMap = new Map<Id, String>{
        '00egL000004YXX7QAO' => 'Name,Industry,Phone',
        '00egL000004YXX8QAO' => 'Name,Industry,Phone',
        '00egL000004YXXCQA4' => 'Name,Phone',
        '00egL000004YXXDQA4' => 'Name,Industry,Rating',
        '00egL000004YXXFQA4' => 'Name,Industry,Phone,Rating',
        '00egL000004YXXPQA4' => 'Name,Type',
        '00egL000004YXXQQA4' => 'Name,Industry,Type',
        '00egL000004YXXmQAO' => 'Name,Phone,Website',
        '00egL000004YXXoQAO' => 'Name,AnnualRevenue',
        '00egL000004YXXjQAO' => 'Name,Industry,Phone,Rating,Type'
    };

    //  Check if profile exists in map
    if (profileFieldMap.containsKey(profileId)) {
        fields = 'Id,' + profileFieldMap.get(profileId);
        system.debug('fields:-'+fields);
    } 

     return fields;
        
    }
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getContactsByProfilefields(Id recordIdval) {
     
    //Get current user profile Id (NO SOQL needed)
    Id profileId = UserInfo.getProfileId();
    String fields = 'Id, Name';
    //  Map ProfileId → Fields (ADD ALL YOUR PROFILES HERE)
    Map<Id, String> profileFieldMap = new Map<Id, String>{
    '00egL000004YXX7QAO' => 'FirstName,LastName,Phone,Email',
    '00egL000004YXX8QAO' => 'FirstName,LastName,Phone,Email',
    '00egL000004YXXCQA4' => 'FirstName,LastName,Phone',
    '00egL000004YXXDQA4' => 'FirstName,LastName,Email,Title',
    '00egL000004YXXFQA4' => 'FirstName,LastName,Phone,Email,Title',
    '00egL000004YXXPQA4' => 'FirstName,LastName,Department',
    '00egL000004YXXQQA4' => 'FirstName,LastName,Department,Email',
    '00egL000004YXXmQAO' => 'FirstName,LastName,Phone,MailingCity',
    '00egL000004YXXoQAO' => 'FirstName,LastName,Email,MailingCountry',
    '00egL000004YXXjQAO' => 'FirstName,LastName,Phone,Email,Title,Department'
   };

    //  Check if profile exists in map
    if (profileFieldMap.containsKey(profileId)) {
        fields = 'Id,' + profileFieldMap.get(profileId);
        system.debug('fields:-'+fields);
    } 
     String query = 'SELECT ' + fields + ' FROM contact WHERE AccountId = :recordIdval';
     //String searchKey = '%' + keywordval + '%';
     List<Contact> conList = Database.query(query); 

     System.debug('conList: ' + conList);

     return new Map<String, Object>{
       'fields' => fields,
       'records' => conList
      };
        
    }
    
    @AuraEnabled
    public static void updateOpportunity(Id recordId, String statusValue, Decimal amount, String stage, Date closeDate){

    Opportunity opp = new Opportunity(Id = recordId);

    opp.Custom_Status__c = statusValue;
    opp.Amount = amount;
    opp.StageName = stage;
    opp.CloseDate = closeDate;
    update opp;
}
}