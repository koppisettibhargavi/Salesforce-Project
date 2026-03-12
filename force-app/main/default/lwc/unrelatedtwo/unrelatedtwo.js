import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import MY_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';

export default class SubscriberComponent extends LightningElement {
    receivedId;
    message;
    subscription;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            MY_CHANNEL,
            (message) => {
                this.receivedId = message.recordId;
                this.message = message.message;
            }
        );
    }
}