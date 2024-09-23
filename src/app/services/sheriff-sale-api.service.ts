import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MasterSherifSale } from '../models/sheriff-sale/master.model';


export const ApiConstants = {

  GET_SHERIFF_SALE_DATE_BETWEEN: '/sheriff-sale-data-between',
  GET_SHERIFF_FILE:"/get-file-sheriff-sale",
  GET_XLSX_SHERIFF_FILE:"/get-xlsx-sheriff-sale"
}

@Injectable({
  providedIn: 'root'
})
export class SheriffSaleApiService {
  private apiUrl = environment.receiptFlaskApi;
  
  constructor(private http: HttpClient) {}


  getSheriffSaleDataBetweenTwoDates(start_date, end_date): Observable<{message: string, sheriff_data: MasterSherifSale[]}> {
    const url = `${this.apiUrl}${ApiConstants.GET_SHERIFF_SALE_DATE_BETWEEN}?start_date=${start_date}&end_date=${end_date}`;
    
    return this.http.get<{message: string, sheriff_data: MasterSherifSale[]}>(url);
  }


  getSheriffFileBlob(path: string): Observable<Blob>{
    const url = `${this.apiUrl}${ApiConstants.GET_SHERIFF_FILE}?path=${path}`;
    return this.http.get(url, { responseType: 'blob' })
  
  }

  getSheriffFileXLSXBlob(id: number): Observable<Blob>{
    const url = `${this.apiUrl}${ApiConstants.GET_XLSX_SHERIFF_FILE}?id=${id}`;
    return this.http.get(url, { responseType: 'blob' })
  
  }


}
