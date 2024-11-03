import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContractorAPI } from 'src/app/models/contractor/contractor.api.model';
import { ContractorApiService } from './contractor-api/contractor-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  contractorsSubject: Subject<ContractorAPI[]> = new Subject<ContractorAPI[]>();
  contractors: ContractorAPI[] = []
  
  constructor(private contractorApi: ContractorApiService) { 
    this.getContractors();
  }
  
  public getContractors() {
    this.contractorApi.getAllContractors().subscribe(
      (data:  { contractors: ContractorAPI[], message: string }) => { 
      console.log("Data: "+data.contractors);
      this.contractors = data.contractors;
      this.contractorsSubject.next(this.contractors); 
    });
  }

}
