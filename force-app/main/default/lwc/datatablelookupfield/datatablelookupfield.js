import { LightningElement,track} from 'lwc';
import getContact from '@salesforce/apex/Datableclass.getContact';
export default class Datatablelookupfield extends LightningElement {
    @track colscol= [
        { label: 'Contact Name', fieldName: 'LastName', type: 'text'},
        { label: 'Phone', fieldName: 'Phone', type: 'text'},
        { label:'Account Name',fieldName:'AccountId',type: 'text'},
        { label:'Account rating',fieldName:'accRating',type: 'text'}
       ];
    connectedCallback(){
        this.getdata();
    }
    @track datalist=[];
    getdata(){
        getContact()
        .then(result=>{
            this.datalist = result.map(item => {
            return {
                ...item,
                AccountId: item.Account ? item.Account.Name : '',
                accRating: item.Account ? item.Account.Rating : ''
            };
        });
        console.log('dataList',this.datalist);
           /*this.datalist=result;
           let templist=JSON.parse(JSON.stringify(this.datalist));
           templist.forEach(element => {
              console.log(element);
              element.AccountId=element.AccountId!=undefined? element.Account.Name:'';
              element.accRating=element.Account!=undefined?element.Account.Rating:'';
           });
           this.datalist=templist;*/
        })
        .catch(error=>{
            console.log(error);
        })
    }
}