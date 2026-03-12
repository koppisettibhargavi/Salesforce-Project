public class myclass {
    Integer val;
    public myclass(Integer a){
        val=a;
        system.debug('hello this constructor');
    } 
    
    public void mymethod(){
        system.debug('hello');
        system.debug('sum' + val);
    }
}