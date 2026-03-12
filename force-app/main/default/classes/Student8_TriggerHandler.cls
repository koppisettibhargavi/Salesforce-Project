public class Student8_TriggerHandler {
    public static void InsertOnStudent(List<student8__c> newlist){
          List<Task> newtask=new list<task>();
          for(student8__c t:newlist){
              if(t.active__c==true && student8__c.task.t.name__c!=null){
                  task t1=new task(Status='In Progress',Subject=t.name,Priority='low',whoId=t.id);
                  newtask.add(t1);
              }
              else{
                  t.active__c.adderror('make active true');
              }
             		
       }
        insert newtask; 
    }
    
    public static void deleteError(list<student8__c> oldlistids){
      
    if (oldListIds == null || oldListIds.isEmpty()) return;

    // 1) collect Ids from the incoming list
    Set<Id> oldIds = new Set<Id>();
    for (student8__c s : oldListIds) {
        if (s.Id != null) oldIds.add(s.Id);
    }
    if (oldIds.isEmpty()) return;

    // 2) aggregate Course__c by the lookup field student8__c (alias studentId)
    List<AggregateResult> agg = [
        SELECT student8__c studentId, COUNT(Id) cnt
        FROM Course__c
        WHERE student8__c IN :oldIds
        GROUP BY student8__c
        HAVING COUNT(Id) > 0
    ];
    system.debug(agg);
    // 3) build a map studentId -> courseCount for easy lookup
    Map<Id, Integer> studentToCount = new Map<Id, Integer>();
    for (AggregateResult ar : agg) {
        Id sid = (Id) ar.get('studentId');        // alias is case-sensitive
        Integer c = (Integer) ar.get('cnt');      // alias for COUNT(Id)
        studentToCount.put(sid,c);
    }

    // 4) addError on the records in the original oldList to prevent delete
    for (student8__c s : oldListIds) {
        if (studentToCount.containsKey(s.Id)) {
            Integer countCourses = studentToCount.get(s.Id);
            s.addError('Delete not allowed: this student has ' + countCourses + ' Course record(s).');
        }
    }
}
    
    public static void undeleteerror(list<student8__c> newdeletedIds){
        for(student8__c stc:newdeletedIds){
            
               stc.adderror('undeleted successfully');
           
        }
        
    }

}