import { LightningElement,api} from 'lwc';

export default class Child extends LightningElement {
    @api childmsg;
    @api parentval='hello child';
    @api namemsg;
    name;
    industry;
    rating;
    _accountdatamsg;
    @api number=0;
    currentnum=0;
    priornum=0;
    get number(){
        return this.currentnum;
    }
    set number(value){
        this.priornum=this.currentnum;
        this.currentnum=value;
    }
    @api clickaddfun(event){
        console.log('num',this.number);
        this.number=this.number+7;
    }
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