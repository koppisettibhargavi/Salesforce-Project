import { LightningElement ,api} from 'lwc';

export default class Secondlwc extends LightningElement {
  @api userName='';
  

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' }
        ];
    }

    handleChange(event) {
       this.boxvalue = event.target.value;
    } 
    
   
}