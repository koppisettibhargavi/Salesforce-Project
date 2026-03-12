public class Email {
    Public static void  SendEmail(){
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {'koppisettibhargavi4@gmail.com'}; 
        String[] ccAddresses = new String[] {'koppisettibhargavi96@gmail.com'};
        mail.setToAddresses(toAddresses);
        mail.setCcAddresses(ccAddresses);
        mail.setSubject('Congratulations ');
        mail.setPlainTextBody('Your salesforce Email');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail }); 
        system.debug('email sent');
    }
}