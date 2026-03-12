public class NewRecursionHandler {
    /*public static void Insertfun(List<Account> FromList){
    List<Account> newone=new List<Account>();
    for(Account acc:FromList){
        Account Extra=New Account();
        Extra.name='syamsri';
        Extra.Rating='hot';
        newone.add(Extra);
    }
    insert newone;
    }*/
    
    public static void UpdateFun(Map<Id,Account> oldmaplist ,Map <Id,Account> newmaplist){
        system.debug('oldmap'+oldmaplist);
        system.debug('newmap'+newmaplist);
        set<Id> newlistofmap=oldmaplist.keyset();
        for (id ids:newlistofmap){
            oldmaplist.get(ids).name='ram';
        }
        system.debug('newlist'+newlistofmap);
        system.debug('Done'); 
        //update oldmaplist;
    }
}