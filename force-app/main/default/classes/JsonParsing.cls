public class JsonParsing {
    public static void jsonfun(){ 
       
        String jsonData ='{"coffee":{"region":[{"id":1,"name":"John Doe"},{"id":2,"name":"Don Joeh"}],"country":{"id":2,"company":"ACME"}},"brewing":{"region":[{"id":1,"name":"John Doe"},{"id":2,"name":"Don Joeh"}],"country":{"id":2,"company":"ACME"}}}';
        system.debug('jsonData'+jsonData);
        Map<String,Object> mainData =(Map<String,Object>) JSON.deserializeUntyped(jsonData);
        system.debug('unpackedData'+mainData);
        Map<String,Object> coffee =(Map<String,Object>) mainData.get('coffee');
        System.debug('coffee'+coffee);
        Map<String,Object> brewing=(Map<string,Object>) mainData.get('brewing');
        system.debug('brewing'+brewing);
        Map<String,Object> newcountry=(Map<String,Object>) coffee.get('country');
        system.debug('newcountry'+newcountry);
        list<Object> newregions=(list<object>) coffee.get('region');
        system.debug('newregions'+newregions);
        for(Object obj:newregions){
           system.debug('obj'+obj);
           Map<String,Object> region =(Map<String,Object>) obj;
           system.debug('obj'+obj);
           system.debug('region'+region); 
           string name=(string)region.get('name');
           system.debug('name'+name);
           Account acc=new Account(name=name);
           insert acc;
        }
    }       
    public static void jsonwrapperfun(){
          String jsonData =
        '{"coffee":{"region":[{"id":1,"name":"John Doe"},{"id":2,"name":"Don Joeh"}],"country":{"id":2,"company":"ACME"}},"brewing":{"region":[{"id":1,"name":"John Doe"},{"id":2,"name":"Don Joeh"}],"country":{"id":2,"company":"ACME"}}}';

        JsonWrapper data =
        (JsonWrapper) JSON.deserialize(
            jsonData,
            JsonWrapper.class
        );

        List<Account> accList =new List<Account>();

        for(JsonWrapper.Region reg : data.coffee.region){

            accList.add(
                new Account(
                    Name = reg.name,County__c=data.coffee.country.company
                )
            );
        }

        

        for(JsonWrapper.Region reg : data.brewing.region){

            accList.add(
                new Account(
                    Name = reg.name,County__c=data.coffee.country.company
                )
            );
        }

        insert accList;
    }
}