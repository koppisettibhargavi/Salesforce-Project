import { LightningElement,api} from 'lwc';
import getsearchData from '@salesforce/apex/SearchComponent.getsearchData'
import getsearchDatafunapi from '@salesforce/apex/SearchComponent.getsearchDatafunapi'
export default class SearchComponent extends LightningElement {
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
        console.log('search data'+searchResult);

   }
   searchChange(event){
        this.searchText=event.target.value;
        console.log(this.searchText);
   }
   getsearchDataResult(){
       //alert('done');
       getsearchDatafunapi({searchText:this.searchText})
       .then(result=>{this.searchResult_s=result;
        console.log(this.searchResult_s);
        const sm=new showtoastEvent({title:'success',message:'operation is success',varient:'success',mode:'dismisal'});
        this.dispatchEvent(sm);
     })
       .catch(error=>{this.error=error_s;
        console.log('search data'+this.error_s);
       }) 
       console.log('searchdone');
   }  


}