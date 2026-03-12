public with sharing class customlookupcontroller {

           @AuraEnabled(cacheable=true)

           public static List<sObject> searchrecords(string objectApiName,string searchKey){
               List<sobject> sobjectList=new List<sObject>();
               if(string.isNotBlank(searchKey)){
                string key='%'+searchKey+'%';
                string queryString='Select Id,Name from'+objectApiName+'where Name Like:key';
                sobjectList=Database.query(queryString,AccessLevel.USER_MODE);
               }
               return sobjectList;
           }
    
}