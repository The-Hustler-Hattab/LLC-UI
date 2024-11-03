import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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

















}
