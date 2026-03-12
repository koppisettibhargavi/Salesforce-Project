import { LightningElement } from 'lwc';
import { subscribe } from 'lightning/messageService';

export default class RelatedContacts extends LightningElement {
    connectedCallback(){
        this.handleSubscribe();
    }

    disconnectedCallback(){
       this.handleUnSubscribe();
    }
    
    handleSubscribe(){
        if(!subscribe){
            this.subscription=subscribe(this.MessageContext,bhargavi,(parameter)=>{
               parameter.AccountId;
               parameter.AccountName;
            });
        }
    }

}