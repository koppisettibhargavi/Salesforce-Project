public with sharing class AccountController {

    @AuraEnabled
    public static void createAccount(String name, String phone, String industry) {
        system.debug(name);
        system.debug(phone);
        system.debug(industry);
        Account acc = new Account(
            Name = name,
            Phone = phone,
            Industry = industry
        ); 

        insert acc;
    }
}