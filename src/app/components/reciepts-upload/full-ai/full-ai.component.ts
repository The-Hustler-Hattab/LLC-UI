import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-full-ai',
  templateUrl: './full-ai.component.html',
  styleUrl: './full-ai.component.scss'
})
export class FullAiComponent {
  selectedFiles: File[] = [];

  users: string[] = ConstantsService.COMPANY_MEMBERS;
  companies: string[] = ConstantsService.COMPANIES;
  spendTypes: string[] = ConstantsService.SPEND_TYPE;


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
    const selectedSpendType = form.value.spendType;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // Handle file upload logic here
      console.log('Selected company name:', selectedCompanyName);
      console.log('Selected customer name:', selectedCustomerName);
      console.log('Selected files:', this.selectedFiles);
      this.proccessReciepts(selectedCompanyName, selectedCustomerName,selectedSpendType); 

      // Reset form fields after upload
      this.selectedFiles = [];
    }

  }


  private proccessReciepts(selectedCompanyName: string, selectedCustomerName: string, selectedSpendType: string) {
    try {
      this.selectedFiles.forEach((file: File) => {
        this.recieptService.processReceipts(selectedCompanyName, selectedCustomerName,selectedSpendType, file)
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
