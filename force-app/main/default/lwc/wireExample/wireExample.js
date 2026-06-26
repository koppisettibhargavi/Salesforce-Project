import { LightningElement,track,wire} from 'lwc';
import getAccountdata from '@salesforce/apex/accountclass.getAccountdata';
import getAccount from '@salesforce/apex/accountclass.getAccount';
export default class WireExample extends LightningElement {
  accountkey='ram';
  @wire(getAccountdata,{acckey:'$accountkey'}) 
  AccData;

  @wire(getAccount)
  handler({data,error}){
    console.log('data',data);
  }
  getkey(event){
    this.accountkey=event.target.value;
    console.log('key',accountkey);
  }
}