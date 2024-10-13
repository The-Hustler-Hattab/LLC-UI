import { Component } from '@angular/core';
import { Bank } from 'src/app/models/banks.chart.model';
import { Column } from 'src/app/models/column.model';
import { ManageBankService } from 'src/app/services/banks/manage.service';
import { PlaidApiService } from 'src/app/services/plaid-api.service';





@Component({
  selector: 'app-manage-bank',
  templateUrl: './manage-bank.component.html',
  styleUrl: './manage-bank.component.scss'
})
export class ManageBankComponent {

  banks!: Bank[];

  cols!: Column[];

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;

  constructor(private plaidApi: PlaidApiService, private manageBankSubject : ManageBankService ) {}

  ngOnInit() {
    this.banks = this.manageBankSubject.banks

      this.manageBankSubject.bankSubject.subscribe((data: Bank[]) => {
        this.banks = data;
      })

      
      this.cols = [
         { field: 'id', header: 'ID' },
          { field: 'institution_id', header: 'Institution ID' },
          { field: 'institution_name', header: 'Institution Name' },

          { field: 'created_by', header: 'Created By' },
          { field: 'created_at', header: 'Created At' },

      ];
  }

  deleteBank(id: number) {
    console.log(id);
    
    this.plaidApi.deleteByBankId(id)
      .subscribe((data: {message: string}) => {
        console.log(data.message);
        this.isSubmissionSuccessful = true;
        this.submitStatus = data.message;
        this.refresh();
      },
      (error) => {
        console.error('Error deleting bank:', error)
        this.submitStatus = error.error.message;
        this.isSubmissionSuccessful = false;
      })
    
    ;
  }
  refresh() {
    this.manageBankSubject.getAllBanks();
  }
  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }
}
