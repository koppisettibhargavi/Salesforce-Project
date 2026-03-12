public class DynamicSOSL {
    public static void dynamicfun(){
        List<String> keywords = new List<String>{ 'ram', 'Global', 'Tech' };

// Sanitize and combine using OR or AND
List<String> escaped = new List<String>();
for(String k : keywords){
    escaped.add(String.escapeSingleQuotes(k));
} 
system.debug(escaped);
String searchString = String.join(escaped, ' OR ');
system.debug(searchString);
String soslQuery = 'FIND \'' + searchString  + '\' IN ALL FIELDS ' +
                   'RETURNING Account(Id, Name), Contact(Id, Name)';

List<List<SObject>> results = Search.query(soslQuery);

// Parse results
List<Account> accs = (List<Account>)results[0];
List<Contact> cons = (List<Contact>)results[1];

System.debug('Final Search String: ' + results);
    }
}
//DynamicSOSL.dynamicfun();