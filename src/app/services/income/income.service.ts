import { Injectable } from '@angular/core';
import { IncomeApiServiceService } from '../income-api-service.service';
import { Subject } from 'rxjs';
import { LLCIncome } from 'src/app/models/llc-income.model';
import { FilesService } from '../azure-blob/files.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  incomeSubject: Subject<LLCIncome[]> = new Subject<LLCIncome[]>();
  income: LLCIncome[] = []
  
  constructor(private incomeApi :IncomeApiServiceService) { 
    this.getIncome();
  }





  public getIncome() {
    this.incomeApi.getAllIncome().subscribe((data:  { income: LLCIncome[], message: string }) => { 
      console.log("Data: "+data.income);
      this.income = data.income;
      this.incomeSubject.next(this.income); 
    });
  }

  downloadFile(file_path: string) {
    this.incomeApi.getIncomeFile(file_path).subscribe(
      (blob: Blob) => {
        FilesService.saveFile(blob, file_path);
      }
    );
  }
  

}
