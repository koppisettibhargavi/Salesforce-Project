import { LightningElement,track } from 'lwc';

export default class Mom extends LightningElement {
    name='ram';
    single='param';
    @track data={
        name:'ram',
        Isshow:false,
        age:23
    }
    onchangeName(Event){
    
        this.data={
            ...this.data,
            name:Event.target.value,
        };
        
    } 



    
}