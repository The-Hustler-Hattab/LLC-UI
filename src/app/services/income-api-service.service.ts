import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LLCIncome } from '../models/llc-income.model';


export const ApiConstants = {
  STORE_INCOME: '/store-income',
  GET_ALL_INCOME: '/get-all-income',
  DELETE_INCOME: '/delete-income',
  GET_INCOME_FILE: '/get-income-file'


}

@Injectable({
  providedIn: 'root'
})
export class IncomeApiServiceService {
  private apiUrl = environment.receiptFlaskApi;

  constructor(private http: HttpClient) {}





  storeIncome(source: string,grossRevenue: number,
    netRevenue: number, tax: number, comment: string, receivedAt: string ,file?: File): Observable<{message: string}> {
    
    const formData = new FormData();
    if(file != null){
      console.log("saving file: "+file);
      
      formData.append('file', file);
    }
    formData.append('source', source);
    formData.append('gross_revenue', grossRevenue.toString());
    formData.append('net_revenue', netRevenue.toString());
    formData.append('tax', tax.toString());
    formData.append('comment', comment);
    formData.append('received_at', receivedAt);

    const url = `${this.apiUrl}${ApiConstants.STORE_INCOME}`;
    return this.http.post<{message: string}>(url, formData);
  }



  getAllIncome(): Observable<{message: string, income: LLCIncome[]}> {
    const url = `${this.apiUrl}${ApiConstants.GET_ALL_INCOME}`;
    
    return this.http.get<{message: string, income: LLCIncome[]}>(url);
  }

  deleteIncome(id: number): Observable<{message: string}> {
    const url = `${this.apiUrl}${ApiConstants.DELETE_INCOME}?id=${id}`;
    return this.http.delete<{message: string}>(url);
  }

  getIncomeFile(filePath: string): Observable<Blob> {
    const url = `${this.apiUrl}${ApiConstants.GET_INCOME_FILE}?path=${filePath}`;
    return this.http.get(url, {responseType: 'blob'});
  }


}
