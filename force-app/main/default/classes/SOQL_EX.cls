public class SOQL_EX {
  List<Account> MynewList=new List<Account>();
    public SOQL_EX(){
        MynewList=[SELECT id,name FROM Account];
    }
}