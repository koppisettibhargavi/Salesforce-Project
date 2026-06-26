import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import xlsxResource from '@salesforce/resourceUrl/xlsx';
import uploadAccounts from '@salesforce/apex/ExcelUploadController.uploadAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
export default class Contacts extends LightningElement {
    // Flag to check whether the XLSX library has been loaded successfully
    isLibraryLoaded = false;

    connectedCallback() {
        // Load the XLSX library from the Static Resource when the component loads
        loadScript(this, xlsxResource + '/xlsx.full.min.js')
            .then(() => {
                // Mark the library as loaded so it can be used later
                this.isLibraryLoaded = true;
                console.log('XLSX Library Loaded');
            })
            .catch(error => {
                console.error('Error loading XLSX library', error);
            });
    }

    handleFileUpload(event) {
        // Prevent file processing if the XLSX library is not loaded
        if (!this.isLibraryLoaded) {
            console.error('XLSX Library not loaded');
            return;
        }
        // Get the uploaded file from the file input
        const file = event.target.files[0];
        // Stop execution if no file was selected
        if (!file) {
            return;
        }
        // Create a FileReader object to read the uploaded file
        const reader = new FileReader();
        // This function runs after the file is read successfully
        reader.onload = (e) => {
            // Get the binary data from the uploaded Excel file
            const data = e.target.result;
            // Convert the binary data into a workbook object
            const workbook = window.XLSX.read(data, {
                type: 'binary'
            });
            // Get the name of the first worksheet in the workbook
            const sheetName = workbook.SheetNames[0];
            // Get the actual worksheet object using the sheet name
            const worksheet = workbook.Sheets[sheetName];
             // Convert worksheet rows into a JSON array
            const records = window.XLSX.utils.sheet_to_json(worksheet);
            // Print the JSON records in browser console
            console.log('Records:', JSON.stringify(records));
            // Call a method to send the records to Apex
            this.uploadRecords(records);
        };
        // Read the uploaded Excel file as binary data
        reader.readAsBinaryString(file);
        
        const eve=new ShowToastEvent({
                title: 'Success',
                message: 'File Uploaded successfully Processing....',
                variant: 'success'
        })
        this.dispatchEvent(eve);

    }

    uploadRecords(records) {

        uploadAccounts({
            jsonData: JSON.stringify(records)
        })
        .then(result => {
            
            if(result.statusval !== ''){
                
                let msg=result;
                console.log('Success:', msg);
                const eveerror=new ShowToastEvent({
                title: 'Error',
                message: msg,
                variant: 'Error' })
                this.dispatchEvent(eveerror);
            }
            
        })
        .catch(error => {
            let message = 'Unknown error';
            if (error.body) {
              if (error.body.message) {
                message = error.body.message;
             } 
            else if (error.body.pageErrors && error.body.pageErrors.length > 0) {
                message = error.body.pageErrors[0].message;
            }
           }
            /*console.error('Error:',JSON.stringify(error));
            console.error('Errormessage:',message);
            const eveerror=new ShowToastEvent({
                title: 'Error',
                message: message,
                variant: 'Error'
           })
           this.dispatchEvent(eveerror);*/
        });
    }
}