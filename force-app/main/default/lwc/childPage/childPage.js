import { LightningElement,api} from 'lwc';

export default class ChildPage extends LightningElement {
    addcustomEvent(){
        this.dispatchEvent(new CustomEvent("addcustom"));
        console.log('addevent');
    }
    subcustomEvent(){
        this.dispatchEvent(new CustomEvent("subcustom"));
        console.log('subevent');
    }
    mulcustomEvent(){
        this.dispatchEvent(new CustomEvent("mulcustom",{detail:2}));
        console.log('mulcustom');
    }
    mulcustomEventhandle(event){
        const val=event.target.dataset.factor;
        this.dispatchEvent(new CustomEvent("mulcustomhandle",{detail:val}));
        console.log(val);
    }
    @api array=[0,1,2,3,4];
    
    mulcustomEventhandle10(event){
        const factor = parseInt(event.currentTarget.dataset.factor);
        this.dispatchEvent(new CustomEvent("mulfunhandle10",{detail:factor}));
        console.log('datafactorval',factor);
    }
    /*mulcustomEventhandle100(event){
      const val=event.detail;
      this.dispatchEvent(new CustomEvent("mulcustom100",{detail:val,bubbles: true,composed: true}));
      console.log('from subchild',event.detail);
    }*/ 
    fname='';
    lname='';
    handlefirstName(event){
        this.fname=event.target.value;
    }
    handlelastName(event){
        this.lname=event.target.value;
    }
    @api isdelete=false;
    handlesubmitevent(){
        this.isdelete=false;
        this.dispatchEvent(new CustomEvent("submitaction",{detail:{fn:this.fname,ln:this.lname,isdel:this.isdelete},bubbles:true}));
    }
    
    handleclearevent(){
        this.fname='';
        this.lname='';
        this.isdelete=true;
        this.dispatchEvent(new CustomEvent("submitaction",{detail:{fn:this.fname,ln:this.lname,isdel:this.isdelete},bubbles:true}));
    }

}