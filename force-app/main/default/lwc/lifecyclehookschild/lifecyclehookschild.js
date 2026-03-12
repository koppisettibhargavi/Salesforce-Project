import { LightningElement } from 'lwc';

export default class Lifecyclehookschild extends LightningElement {
    
    constructor(){
        super();
        console.log('constructor from child');
    }

    renderedCallback(){
        console.log('rendered callback from child');
    } 

    connectedCallback(){
        console.log('connected callback from child');
        throw new Error("error while loading");
    }

    errorCallback(error,stack){
        console.log('error callback from child');
    } 

    disconnectedCallback(){
        console.log('disconnected callback from child');
    }
}