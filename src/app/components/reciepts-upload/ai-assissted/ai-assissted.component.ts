import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Reciept } from 'src/app/models/reciept.model';
import { ConstantsService } from 'src/app/services/constants.service';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-ai-assissted',
  templateUrl: './ai-assissted.component.html',
  styleUrl: './ai-assissted.component.scss',
})
export class AiAssisstedComponent {

  selectedFile: File;
  uploaded: boolean = false;
  
  formData: any;
  users: string[] = ConstantsService.COMPANY_MEMBERS;
  companies: string[] = ConstantsService.COMPANIES;
  
  date: Date | undefined;
  pdfSrc: SafeResourceUrl | null = null; // Use SafeResourceUrl for sanitized URLs


  // onFileSelected(event: Event): void {
  //   const eventTarget = event.target as HTMLInputElement;
  //   const file: File | null = eventTarget.files ? eventTarget.files[0] : null;

  //   if (file) {
  //     const blobUrl = URL.createObjectURL(file);
  //     this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl); // Sanitize the Blob URL
  //   }

  // }

  constructor(private recieptService: ReceiptService, private sanitizer: DomSanitizer) { } 
  onFilesSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
    if (this.selectedFile) {
      this.pdfSrc = URL.createObjectURL(this.selectedFile); // Create a URL for the selected file
    }
    const eventTarget = event.target as HTMLInputElement;
    const file: File | null = eventTarget.files ? eventTarget.files[0] : null;

    if (file) {
      const blobUrl = URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl); // Sanitize the Blob URL
    }
  }

  onSubmits(form: NgForm) {
    console.log(this.selectedFile);
    // this.uploaded = true;
    this.recieptService.processReceiptsAIAssissted(this.selectedFile)
    .subscribe(
      (data: {message: string, document_details: Reciept}) => {
      console.log(JSON.stringify( data.document_details));
      this.uploaded = true;
      this.formData = data.document_details;
      this.date = new Date(this.formData.purchased_at)
 
    })


  }

}
