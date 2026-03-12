import { LightningElement,api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getsearchData from '@salesforce/apex/SearchComponent.getsearchData'
import getsearchDatafunapi from '@salesforce/apex/SearchComponent.getsearchDatafunapi'

export default class Webcomponentforsearch extends LightningElement {
         @api searchResult;
         @api error;
         @api searchText;
         @api searchResult_s;
         @api error_s;
         //@api searchText;
         getsearchDataFun(){
              getsearchData()
             .then(result=>{this.searchResult=result;
              console.log(this.searchResult);
             })
             .catch(error=>{this.error=error;})
              console.log('search data'+this.searchResult);
      
         }
         searchChange(event){
              this.searchText=event.target.value;
              console.log(this.searchText);
         }
         getsearchDataResult(){
             //alert('done');
             getsearchDatafunapi({searchText:this.searchText})
             .then(result=>{this.searchResult_s=result;
              this.dispatchEvent(
                  new ShowToastEvent({
                  title: 'Success',
                  message: 'Records fetched successfully',
                  variant: 'success',
                  mode:'sticky'}));
             })
             .catch(error=>{this.error_s=error;
               console.log('search data'+this.error_s);
             })
             console.log('searchdone');
         }  
}