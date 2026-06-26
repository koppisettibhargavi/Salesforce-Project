public class AccountHandlerforDeleteObject {
    public static void DeleteObjectinsert(List<Sobject>newrecorddata){
        List<DeleteObject__c> recordsToInsert = new List<DeleteObject__c>();
        for(Sobject delrec:newrecorddata){
            DeleteObject__c newrecord=new DeleteObject__c();
            // Record Id
            newrecord.RecordId__c =
                String.valueOf(delrec.get('Id'));

            // Object API Name
            newrecord.RecordObjApiName__c =
                delrec.getSObjectType().getDescribe().getName();

            // Dynamic Record Name Handling
            String objectName =
                delrec.getSObjectType().getDescribe().getName();

            if(objectName == 'Account'){

                newrecord.Name =
                    String.valueOf(delrec.get('Name'));
            }
            else if(objectName == 'Contact'){

                newrecord.Name =
                    String.valueOf(delrec.get('FirstName')) + ' ' +
                    String.valueOf(delrec.get('LastName'));
            }
            else if(objectName == 'Opportunity'){

                newrecord.Name =
                    String.valueOf(delrec.get('Name'));
            }
            else{

                newrecord.Name = 'Deleted Record';
            }

            // Deleted Date & Time
            newrecord.DeletedDateTime__c = System.now();

            // Deleted By
            newrecord.DeletedBy__c = UserInfo.getUserId();

            recordsToInsert.add(newrecord);

            System.debug('Deleted Record => ' + delrec);
        }

        try{

           insert recordsToInsert;

          System.debug('Inserted Successfully');

         }
       catch(Exception e){
          System.debug('Error => ' + e.getMessage());
       }
        
    }
}