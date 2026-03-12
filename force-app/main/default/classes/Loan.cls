public class Loan{
    public Decimal AnnualInterest{get;set;}
    public Integer Years{get;set;}
    public Decimal Amount{get;set;}
    public Decimal MonthlyPayment{get;set;}
    public Decimal TotalPayment{get;set;}
    public Account acc { get; set; } 
    public Contact con { get; set; }

    public void GetInterest(Account a,Contact c){
    Decimal r =  AnnualInterest/ 100/ 12;
    Integer n = Years * 12;
    Decimal k=Amount/n;
    //Decimal s=1-Math.pow((1+r),-n);
    //MonthlyPayment=k/s;
    //TotalPayment= MonthlyPayment * n;
    } 
}