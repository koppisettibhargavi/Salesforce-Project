public class MapPraticeClass {
   
    public static void displayMaplist(){
        List <account> Acclist=[select name ,id from Account];
        Map <Id,Account> newmap=new map<Id,Account>(Acclist);
        system.debug(newmap);
   
    }
   
}