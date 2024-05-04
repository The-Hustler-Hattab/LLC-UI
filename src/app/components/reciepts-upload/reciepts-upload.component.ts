import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-reciepts-upload',
  templateUrl: './reciepts-upload.component.html',
  styleUrl: './reciepts-upload.component.scss'
})
export class RecieptsUploadComponent {

  selectedFiles: File[] = [];


  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;

  constructor(private recieptService:ReceiptService) { }

  onFilesSelected(event: any) {
    this.selectedFiles = [...event.target.files]; // Convert FileList to array
  }
  onSubmits(form: NgForm) {
    console.log(form.value);
    const selectedCompanyName = form.value.companyName;
    const selectedCustomerName = form.value.customerName;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // Handle file upload logic here
      console.log('Selected company name:', selectedCompanyName);
      console.log('Selected customer name:', selectedCustomerName);
      console.log('Selected files:', this.selectedFiles);
      this.proccessReciepts(selectedCompanyName, selectedCustomerName); 

      // Reset form fields after upload
      this.selectedFiles = [];
    }

  }
  // onSubmit(selectedCompanyName: string, selectedCustomerName: string) {
  //   if (this.selectedFiles && this.selectedFiles.length > 0) {
  //     // Handle file upload logic here
  //     console.log('Selected company name:', selectedCompanyName);
  //     console.log('Selected customer name:', selectedCustomerName);
  //     console.log('Selected files:', this.selectedFiles);
  //     this.proccessReciepts(selectedCompanyName, selectedCustomerName); 

  //     // Reset form fields after upload
  //     this.selectedFiles = [];
  //   }
  // }

  private proccessReciepts(selectedCompanyName: string, selectedCustomerName: string) {
    try {
      this.selectedFiles.forEach((file: File) => {
        this.recieptService.processReceipts(selectedCompanyName, selectedCustomerName, file)
          .subscribe(
            (response: { message: string }) => {
              console.log(response);
              this.isSubmissionSuccessful = true;
              this.submitStatus = response.message;
          },
            (error) => {
              console.error('Error processing file:', error)
              this.submitStatus = error.message;
              this.isSubmissionSuccessful = false;
            }
        
        );
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }
}
