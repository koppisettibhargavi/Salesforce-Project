public with Sharing class Contactsender {
    @AuraEnabled(Cacheable=true)
    public static List<contact> getContacts(){
          return [SELECT Id, Name FROM contact limit 5];
    }
}