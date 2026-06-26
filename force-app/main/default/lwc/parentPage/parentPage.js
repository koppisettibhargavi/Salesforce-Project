import { LightningElement,api} from 'lwc';

export default class ParentPage extends LightningElement {
  @api num=0;
  datalist=[];
  subchildval=1000
    AddFun(){
      if(this.num<10){
        this.num+=1;
      }
    }

    SubFun(){
      if(this.num>0){
        this.num-=1;
      }
    }

    MulFun(event){
        const val=event.detail;
        this.num=this.num*event.detail;
        console.log(this.num);
    }
    MulFunhandle(event){
       const val=event.detail;
        this.num=this.num*event.detail;
        console.log(this.num);
    }
    MulFunhandle10(event){
       const val=event.detail;
        this.num=this.num*event.detail;
        console.log('num',this.num);
        console.log('val',val);
    }

    MulFunhandle100(event){
      const val=event.detail;
        this.num=this.num*event.detail;
        console.log(this.num);
        console.log("from child",event.detail);
    }

    constructor(){
      super();
      this.template.addEventListener('submitaction',this.handlesubmitevent.bind(this))
    }
    firstName='';
    lastName='';
    isdelete=false;
    colscol=[{label:'firstname',fieldName:'firstName'},{label:'lastname',fieldName:'lastName'}];
    handlesubmitevent(event){
      
      this.firstName=event.detail.fn;
      this.lastName=event.detail.ln;
      this.isdelete=event.detail.isdel;
      console.log(this.isdelete);
      if(event.detail.isdel){
        this.datalist=[];
      }
      else{
        console.log('i am at else');
         const newdata={
           firstName:event.detail.fn,
           lastName:event.detail.ln,
         }
        this.datalist=[...this.datalist,newdata];
        

      }
      
    }
}