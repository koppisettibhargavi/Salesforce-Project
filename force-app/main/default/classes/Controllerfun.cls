public with sharing class Controllerfun {
    
        
        
    @AuraEnabled(cacheable=true)
    public static Map<String,string> getAccountFieldsByPlan(Id recordIdval) {
        list<Account> AcccountValues=[select Planset__c,Id from Account where Id=:recordIdval];
         system.debug('AcccountValues'+AcccountValues);
         String planSetValue;

         if (!AcccountValues.isEmpty()) {
            planSetValue = AcccountValues[0].Planset__c;
         }
          //Map Plan → FieldSet
        Map<String, String> planFieldMap = new Map<String, String>{
          'ESOP' => 'Name, Industry, Phone,',
          'KSOP' => 'Name, Industry, Phone, Website',
          'GSOP' => 'Name, Phone, Rating',
          'MSOP' => 'Name, Industry, Phone, Rating, Type'
       };

      String fieldvals = planFieldMap.get(planSetValue);
       // fallback
      if (fieldvals == null) {
         fieldvals = 'Name,Rating,Website,Phone,Type,Industry'; 
       }
       
        
         
         List<String> fields = new List<String>();

         return new Map<String,string>{
               'fields' => fieldvals,
               'planSetValue' => planSetValue
      };
  }
    
    @AuraEnabled(cacheable=true)
    public static Map<String,string> getFieldsByPlan(Id recordIdval) {
        list<Account> AcccountValues=[select Planset__c,Id from Account where Id=:recordIdval];
         system.debug('AcccountValues'+AcccountValues);
         String planSetValue;

         if (!AcccountValues.isEmpty()) {
            planSetValue = AcccountValues[0].Planset__c;
         }
          

         String fieldvals = 'Plan_Amount__c,Plan_Tenure__c,Plan_Benefits__c,Start_Date__c,End_Date__c,Interest_Rate__c,Eligibility__c';
         List<String> fields = new List<String>();

         return new Map<String,string>{
               'fields' => fieldvals,
               'planSetValue' => planSetValue
       };
    }
  
        
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getAccountsByProfile(Id lastId, Integer pageSize,Id firstId) {
     
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

    //  Dynamic SOQL
      String query = 'SELECT ' + fields + ' FROM Account ';

     if (firstId != null) {
        query += 'WHERE Id >= \'' + firstId + '\' ';
      } 
     else if (lastId != null) {
          query += 'WHERE Id > \'' + lastId + '\' ';
     }

     query += 'ORDER BY Id LIMIT ' + pageSize;

     List<Account> accList = Database.query(query); 

    System.debug('accList: ' + accList);

    return new Map<String, Object>{
       'fields' => fields,
       'records' => accList
      };
        
   }
    
    
    
   @AuraEnabled(cacheable=true)
    public static Account getAccount(Id recordId) {
        return [SELECT Id, Name, Phone, Industry FROM Account WHERE Id = :recordId LIMIT 1];
    }
    
    @AuraEnabled(cacheable=true)
    public static String getOpp(Id RecordTypeId) {
        if (RecordTypeId == '012gL000004teybQAA') {
           
            return 'Name,StageName,CloseDate,Amount';
            
        } 
        else if (RecordTypeId == '012gL000004tf1pQAA') {
            
            return 'Name,Amount,Probability,StageName,CloseDate';
            
        }
        return 'Name,StageName,CloseDate';
    }
   
        
    
    @AuraEnabled(cacheable=true)
    public static Contact getcontact(Id recordId) {
        return [SELECT FirstName,LastName,Phone,Email,Title,Department From Contact WHERE Id = :recordId];
    }

    @AuraEnabled
    public static void updateAccount(Id recordId, String name, String phone, String industry,String fax) {

        Account acc = new Account(
            Id = recordId,
            Name = name,
            Phone = phone,
            Industry = industry,
            Fax=fax
        );

        update acc;
    }
}