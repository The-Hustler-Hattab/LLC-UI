import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';
import { IncomeApiServiceService } from 'src/app/services/income-api-service.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  selectedFile: File;
  incomeType: string[] = ConstantsService.INCOME_TYPE;

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;

  constructor(private incomeService: IncomeApiServiceService) { }

  onSubmits(form: NgForm) {
    // Log form object and values to the console
    console.log("Form submitted! ", form);
    console.log("Form values: ", form.value);
    console.log("Proof file: ", this.selectedFile);
    
    
    this.incomeService.storeIncome( form.value.source, 
      form.value.grossRevenue,
       form.value.netRevenue,
        form.value.tax,
         form.value.comment,this.selectedFile).subscribe( 
              (data: {message: string}) => {
          console.log(JSON.stringify(data.message));
          this.isSubmissionSuccessful = true;
          this.submitStatus = data.message;
        },
        (error) => {
          console.error('Error processing file:', error)
          this.submitStatus = error.error.message;
          this.isSubmissionSuccessful = false;
        })  
  }

  onFilesSelected(event: any) {
    this.selectedFile = event.target.files[0]; 

  }
  
  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }


}
