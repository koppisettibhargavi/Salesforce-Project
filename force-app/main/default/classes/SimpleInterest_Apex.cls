public class SimpleInterest_Apex{
    
    public Decimal AnnualInterest{get;set;}
    public Integer Years{get;set;}
    public Decimal Amount{get;set;}
    public Decimal MonthlyPayment{get;set;}
    public Decimal TotalPayment{get;set;}
    public void GetInterest(){
        if(Amount<0){
            ApexPages.Message Msg=new Apexpages.Message(Apexpages.Severity.Info,'Amount cannot be negative');
            ApexPages.addmessage(Msg);
        }
        else{
            Double r = Double.valueOf(AnnualInterest) / 100.0 / 12.0;
       Integer n = Years * 12;
       Double base     = 1.0 + r;
        Double exponent = -1.0 * n;
            Double factor   = Math.pow(base, exponent);
            Double denomD   = 1.0 - factor;
        Decimal denom   = Decimal.valueOf(denomD);
            Decimal rateD   = Decimal.valueOf(r);
            MonthlyPayment  = (Amount * rateD) / denom;
        TotalPayment = MonthlyPayment * n;
        
        }
       
    }  
    
    public void Reset(){
        AnnualInterest=null;
        Years=null;	
        Amount=null;
        MonthlyPayment=null;
        TotalPayment=null;
    }
}