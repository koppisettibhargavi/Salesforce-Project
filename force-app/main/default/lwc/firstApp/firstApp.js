import { LightningElement,api, track } from 'lwc';

export default class FirstApp extends LightningElement {
    firstVal=0;
    secondVal=0;
    result=0;
    check;
    //@api userName="ram"; 
    @track userPassword="hari";
    handleDecorators(event){
       this.userPassword=event.target.value;
    }
    handleChangefirst(event){
        this.firstVal=event.target.value;
    } 

    handleChangesecond(event){
        this.secondVal=event.target.value;
        
    }
    handleChangeAdd(event){
        this.result=Number(this.firstVal) + Number(this.secondVal);

    }
    handleChangeSub(event){
        if(this.secondVal<this.firstVal){
           alert('Update second Number');
        }
        else{
           this.result=Number(this.firstVal) -Number(this.secondVal);
        }
    }
    handleChangeMul(event){
        this.result=Number(this.firstVal) * Number(this.secondVal);

    }
    handleChangeDiv(event){
        if(this.secondVal==0){
            alert('CANT DO DIVISION BY ZERO');
        }
        else{
            this.result=Number(this.firstVal) / Number(this.secondVal);
        }

    }
    handleCheck(event){
       alert(event.target.checked);
    }
    
}