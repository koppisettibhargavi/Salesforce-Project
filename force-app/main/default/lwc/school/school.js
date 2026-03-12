import { LightningElement } from 'lwc';

export default class School extends LightningElement {
    name;

    getName(event){
        this.name=event.target.value;
    }
}