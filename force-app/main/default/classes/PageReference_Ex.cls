public class PageReference_Ex{
    public PageReference simpleinterest(){
        PageReference p=new PageReference('/apex/new');
        return p;
    }
    public PageReference interest(){
        PageReference p=new PageReference('/apex/VfFirstPage');
        return p;
    }
    
}