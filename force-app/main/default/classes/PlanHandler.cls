public class PlanHandler  {
     public static void setPlanDefaults(List<Account> records) {

        for (Account acc : records) {
            system.debug('acc'+acc.Planset__c);
            if (acc.Planset__c == 'ESOP') {
                acc.Plan_Amount__c = 500000;
                acc.Plan_Tenure__c = 4;
                acc.Plan_Benefits__c = 'Equity ownership, long-term wealth creation, tax benefits';
                acc.Start_Date__c = Date.newInstance(2024,1,1);
                acc.End_Date__c= Date.newInstance(2028,1,1);
                acc.Interest_Rate__c = 0;
                acc.Eligibility__c = 'Full-time employees with 1+ year service';
            }

            else if (acc.Planset__c == 'KSOP') {
                acc.Plan_Amount__c = 800000;
                acc.Plan_Tenure__c = 3;
                acc.Plan_Benefits__c = 'Higher returns, priority allocation, bonus incentives';
                acc.Start_Date__c = Date.newInstance(2024,4,1);
                acc.End_Date__c = Date.newInstance(2027,4,1);
                acc.Interest_Rate__c = 5;
                acc.Eligibility__c = 'Senior employees or key stakeholders';
            }

            else if (acc.Planset__c == 'GSOP') {
                acc.Plan_Amount__c = 300000;
                acc.Plan_Tenure__c = 2;
                acc.Plan_Benefits__c = 'Stable returns, low risk, flexible withdrawal';
                acc.Start_Date__c = Date.newInstance(2024,6,1);
                acc.End_Date__c = Date.newInstance(2026,6,1);
                acc.Interest_Rate__c = 6.5;
                acc.Eligibility__c = 'All employees/customers';
            }

            else if (acc.Planset__c == 'MSOP') {
                acc.Plan_Amount__c = 1000000;
                acc.Plan_Tenure__c = 5;
                acc.Plan_Benefits__c = 'Maximum returns, premium benefits, long-term growth';
                acc.Start_Date__c = Date.newInstance(2024,1,1);
                acc.End_Date__c = Date.newInstance(2029,1,1);
                acc.Interest_Rate__c = 8;
                acc.Eligibility__c = 'High-value investors or senior management';
                system.debug('Plan_Amount__c');
            }
        }
       system.debug('accountTriggerDone');
    }
}