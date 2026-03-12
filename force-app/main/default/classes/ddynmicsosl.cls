public class ddynmicsosl {
    public static void dynamicfunction(){
        list<string> newkeys=new list<String>{'ram','shyaam'};
system.debug(newkeys); 

list<string> querykey=new list<string>();
for (string k :newkeys){
    querykey.add(string.escapeSingleQuotes(k));
} 
system.debug(querykey); 
string searquerykey=string.join(querykey,'OR');
string searchQuery='FIND \''+querykey+'*\' IN ALL FIELDS RETURN account(name)';
system.debug(searchQuery);
list<list<sobject>>result=search.query(searchQuery);
system.debug(result[0]);


    }
}