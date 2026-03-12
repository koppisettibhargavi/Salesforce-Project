@RestResource(urlMapping='/apiclass/')
global class ApiClassCallOut {
    @httpGet
    global static List<Account> getTopAccouns(){
        Map<String,String> paramsMap=RestContext.request.params;
        Set<Id>accids=new set<Id>();
        String accIndustry=paramsMap.get('Industry');
        List<Account>accountlist=[select id,industry,rating,annualrevenue from account Where Industry=:accIndustry];
        return accountlist;
    }
}