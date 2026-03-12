import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MY_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';

export default class PublisherComponent extends LightningElement {
    recordId;
  
    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.recordId = event.target.value;
    }

    sendMessage() {
        const payload = {
            recordId: this.recordId,
            message:'hellow'
        };
        publish(this.messageContext, MY_CHANNEL, payload);
    }
}