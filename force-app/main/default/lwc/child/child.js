import { LightningElement,api} from 'lwc';

export default class Child extends LightningElement {
    @api childmsg;
    @api parentval='hello child';
    @api namemsg;
    name;
    industry;
    rating;
    _accountdatamsg;

    @api
    get accountdatamsg() {
        return this._accountdatamsg;
    }

    set accountdatamsg(value) {
        this._accountdatamsg = value;

        if (value) {
            this.name = value.name;
            this.industry = value.industry;
            this.rating = value.rating;
        }
    }
    
}