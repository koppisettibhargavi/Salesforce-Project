import { LightningElement } from 'lwc';

export default class Lifecyclehooksparent extends LightningElement {
    displaychild=false;
    constructor(){
        super();
        console.log('constructor frtom paren');
    }

    renderedCallback(){
        console.log('rendered callback from parent');
    } 

    connectedCallback(){
        console.log('connected callback from parent');
    } 

    errorCallback(error,stack)
    {
        console.log('error callback from parent');
        console.log("error",error);
        console.log("stack",stack);
    } 

    disconnectedCallback(){
        console.log('disconnected callback from parent');
    } 

    changeHandler(event){
        this.displaychild=event.target.checked;
    }
}