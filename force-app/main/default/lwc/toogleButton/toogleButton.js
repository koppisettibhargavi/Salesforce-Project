import { LightningElement, track } from 'lwc';
import { NavigationMixin } from "lightning/navigation";

export default class ToogleButton extends LightningElement {
    @track showbutton= true;

    get labelcon(){
        return this.showbutton? 'hide':'show';
    }
    onshowbutton(){
        const pageref = {
            type: 'standard__webPage',
            attributes: {
                url: 'https://www.example.com/'
            }
        };

        this[NavigationMixin.Navigate](pageref);
    }
}