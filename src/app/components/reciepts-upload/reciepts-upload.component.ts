import { Component } from '@angular/core';

@Component({
  selector: 'app-reciepts-upload',
  templateUrl: './reciepts-upload.component.html',
  styleUrl: './reciepts-upload.component.scss'
})
export class RecieptsUploadComponent {
  selectedFiles: File[] = [];
  selectedCompanyName: string = '';
  selectedCustomerName: string = '';

  constructor() { }

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // Handle file upload logic here
      console.log('Selected company name:', this.selectedCompanyName);
      console.log('Selected customer name:', this.selectedCustomerName);
      console.log('Selected files:', this.selectedFiles);
      this.proccessReciepts();

      // Reset form fields after upload
      this.selectedFiles = [];
      this.selectedCompanyName = '';
      this.selectedCustomerName = '';
    }
  }

  private proccessReciepts() {
    try {
      this.selectedFiles.forEach((file: File) => {
        
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
