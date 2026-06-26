import { LightningElement,api } from 'lwc';

export default class Momchild extends LightningElement {
    _data;
    _single;
    @api
    set data(value){
        console.log('value'+value.data);
        
        this._data={
            ...value,
            name:"getting from parent" +value.name
        };
    }
    get data(){
        return this._data;
    }
    @api
    set single(value){
        console.log('value'+value.single);
        this._single='valuesingle'+value;
    }
    get single(){
        return this._single;
    }
    
}