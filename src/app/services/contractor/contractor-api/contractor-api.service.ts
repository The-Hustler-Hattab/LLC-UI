import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ContractorAPI } from 'src/app/models/contractor/contractor.api.model';
import { environment } from 'src/environments/environment';


export const ApiConstants = {
  SAVE_CONTRACTOR: '/save-contractor',
  GET_ALL_CONTRACTORS: '/get-all-contractors',
  DELETE_CONTRACTOR: '/delete-contractor',
  GET_CONTRACTOR_FILE: '/get-contractor-file'
}
@Injectable({
  providedIn: 'root'
})
export class ContractorApiService {
  private apiUrl = environment.receiptFlaskApi;

  constructor(private http: HttpClient) {}

  
  saveContractor(contractorName: string, jobCost: string,
    contractorSkills : string,  comment: string, phoneNumber: string ,file?: File): Observable<{message: string}> {
    
    const formData = new FormData();
    if(file != null){
      console.log("saving file: "+file);
      formData.append('file', file);
    }
    formData.append('contractor_name', contractorName);
    formData.append('job_cost', jobCost);
    formData.append('contractor_skills', contractorSkills );
    formData.append('comment', comment);
    formData.append('phone_number', phoneNumber);

    const url = `${this.apiUrl}${ApiConstants.SAVE_CONTRACTOR}`;
    return this.http.post<{message: string}>(url, formData);
  }

  getAllContractors(): Observable<{message: string, contractors: ContractorAPI[]}> {
    const url = `${this.apiUrl}${ApiConstants.GET_ALL_CONTRACTORS}`;
    
    return this.http.get<{message: string, contractors: ContractorAPI[]}>(url);
  }
  deleteContractors(id: number): Observable<{message: string}> {
    const url = `${this.apiUrl}${ApiConstants.DELETE_CONTRACTOR}?id=${id}`;
    return this.http.delete<{message: string}>(url);
  }

  getContractorFile(filePath: string): Observable<Blob> {
    const url = `${this.apiUrl}${ApiConstants.GET_CONTRACTOR_FILE}?path=${filePath}`;
    return this.http.get(url, {responseType: 'blob'});
  }














}
