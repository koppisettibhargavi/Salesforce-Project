import { LightningElement,track,wire } from 'lwc';
export default class ChildComponent1 extends LightningElement {
    searchText;
    onchangesearch(event){
        this.searchText=event.target.value;
        console.log(this.searchText);
    }
    
    handlesearch(event){
        const searchEvent=new CustomEvent('getsearchdata',{detail:this.searchText});
        this.dispatchEvent(searchEvent);

    }
    
}