import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export const ApiConstants = {
  STORE_INCOME: '/store-income'
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


}
