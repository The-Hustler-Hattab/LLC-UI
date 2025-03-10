import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Receipt } from 'src/app/models/reciept.model';
import { ConstantsService } from 'src/app/services/constants.service';
import { LoadingSpinnerServiceService } from 'src/app/services/loading-spinner-service.service';
import { ReceiptService } from 'src/app/services/reciepts/reciepts-api/receipt.service';

@Component({
  selector: 'app-ai-assissted',
  templateUrl: './ai-assissted.component.html',
  styleUrl: './ai-assissted.component.scss',
})
export class AiAssisstedComponent {


  selectedFile: File;
  uploaded: boolean = false;
  
  formData: any;
  users: string[] = ConstantsService.HATTAB_LLC_COMPANY_MEMBERS;
  companies: string[] = ConstantsService.EXPENSE_CATEGORY;
  spendTypes: string[] = ConstantsService.SPEND_TYPE;

  date: Date | undefined;
  fileSrc: SafeResourceUrl | null = null; // Use SafeResourceUrl for sanitized URLs

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;


  constructor(private recieptService: ReceiptService, private sanitizer: DomSanitizer) { } 
  onFilesSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
    if (this.selectedFile ) {      
      this.fileSrc = URL.createObjectURL(this.selectedFile); // Create a URL for the selected file
    }
    
    const eventTarget = event.target as HTMLInputElement;
    const file: File | null = eventTarget.files ? eventTarget.files[0] : null;

    if (file) {
      const blobUrl = URL.createObjectURL(file);
      this.fileSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl); // Sanitize the Blob URL
    }
  }

  onSubmits(form: NgForm) {
    console.log(this.selectedFile);
    // this.uploaded = true;
    this.recieptService.processReceiptsAIAssissted(this.selectedFile)
    .subscribe(
      (data: {message: string, document_details: Receipt}) => {
      console.log(JSON.stringify( data.document_details));
      // this.lodingService.hide();
      this.uploaded = true;
      this.formData = data.document_details;
      this.date = new Date(this.formData.purchased_at)

 
    })
  }

  storeReciept() {
    // console.log(this.formData.company_name);
    // console.log(this.formData.customer_name);
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(this.date.getDate()).padStart(2, '0');

// Combine them into a string in the format YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    this.recieptService.storeReceiptsAIAssissted(this.selectedFile, this.formData.total,
       this.formData.sub_total, this.formData.tax,
        this.formData.company_name, this.formData.vendor,
        formattedDate, this.formData.vendor_address,
          this.formData.customer_name, this.formData.invoice_id,
          this.formData.spendType, this.formData.sha256, this.formData.description)
    .subscribe(
      (data: {message: string}) => {
      console.log(JSON.stringify(data.message));
      this.isSubmissionSuccessful = true;
      this.submitStatus = data.message;
    },
    (error) => {
      console.error('Error processing file:', error)
      this.submitStatus = error.error.message;
      this.isSubmissionSuccessful = false;
    });
  }

  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
    this.uploaded = false;
    this.formData = null;
  }

  isPdf(){
    return this.selectedFile.name.toLowerCase().endsWith('.pdf');
  }
}