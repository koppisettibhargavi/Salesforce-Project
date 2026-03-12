import { LightningElement } from 'lwc';

export default class RealProject extends LightningElement {
    searchTextParent;
    handleEvent(event){
        this.searchTextParent=event.detail;
    }
}