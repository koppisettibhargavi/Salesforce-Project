public class oppHandler {

    public static void updateDesc(List<Opportunity> opplist,Map<ID,Opportunity> oldMap){
           List<Opportunity> opplisttobeUpdated=new List<Opportunity>();
           for (Opportunity opp:opplist){
              system.debug('iam working2');
             Opportunity o=new Opportunity();
             o.id=opp.id;
            if(opp.stageName!=oldMap.get(opp.id).stageName){
                system.debug('iam working3');
                if(opp.stageName=='Closed Won'){
                    o.Description='oppurtunity is close down';
                    system.debug('iam working4');
                }
               else if(opp.stageName=='Closed Lost'){
                    o.Description='oppurtunity is close lost';
                }
            }
            opplisttobeUpdated.add(o);
        }
           
           update opplisttobeUpdated;
           
    }
}