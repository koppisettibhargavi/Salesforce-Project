import { LightningElement } from 'lwc';

export default class Subchildpage extends LightningElement {
    mulEvent100(){
        this.dispatchEvent(new CustomEvent("mulcustom100",{detail:100,bubbles:true,composed: true}));
        console.log('mulcustomhandle100');
    }

}