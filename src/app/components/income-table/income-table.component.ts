import { Component } from '@angular/core';
import { LLCIncome } from 'src/app/models/llc-income.model';
import { IncomeApiServiceService } from 'src/app/services/income-api-service.service';
import { IncomeService } from 'src/app/services/income/income.service';



@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.scss'
})
export class IncomeTableComponent {

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;


    income!: LLCIncome[];

    selectedIncome!: LLCIncome;

    constructor(private incomeService:IncomeService, private incomeApi :IncomeApiServiceService) {}

    ngOnInit() {
        this.income = this.incomeService.income;
        this.incomeService.incomeSubject.subscribe((income: LLCIncome[]) => {

            this.income = income;
        });
    
    }

    refreshIncome() {
        this.incomeService.getIncome();
    }
    delete(id : number) {
      this.incomeApi.deleteIncome(id)
      .subscribe((data: {message: string}) => {
        console.log(data.message);
        this.isSubmissionSuccessful = true;
        this.submitStatus = data.message;
        this.refreshIncome();
      },
      (error) => {
        console.error('Error deleting income:', error)
        this.submitStatus = error.error.message;
        this.isSubmissionSuccessful = false;
      })
    
    ;
    }


    download(file_path: string) {
      this.incomeService.downloadFile(file_path);
    }

    clearSubmitStatus() {
      this.submitStatus = null;
      this.isSubmissionSuccessful = null;
    }
    
}
