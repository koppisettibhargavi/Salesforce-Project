trigger caseTrigger on Case (before insert) {
    if(trigger.isinsert){
        if(trigger.isbefore){
            list<string> newemails=new list<string>();
            for(case c:[select ContactEmail from case]){
                newemails.add(c.ContactEmail);
            }
            for(case cs:trigger.new){
                if(newemails.contains(cs.ContactEmail))
                {
                    cs.adderror('already there');
                }
            }
            
            set<string> newidset=new set<string>();
            for (case cs:trigger.new){
                newidset.add(cs.SuppliedEmail);
            } 
            list<contact>newcontacts=[select id,email from contact where email in :newidset];
            map<string,id> newidmap=new map<string,id>();
            for (contact c:newcontacts){
                newidmap.put(c.email,c.id);
             }
            for(case s:trigger.new){
                if(newidmap.containskey(s.SuppliedEmail)){
                    s.ContactId=newidmap.get(s.SuppliedEmail);
                }
            }
         
        }
    }
}