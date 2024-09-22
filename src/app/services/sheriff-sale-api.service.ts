import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineHorizantalChartData } from '../models/line.chart.model';
import { environment } from 'src/environments/environment';
import { MasterSherifSale } from '../models/sheriff-sale/master.model';


export const ApiConstants = {

  GET_SHERIFF_SALE_DATE_BETWEEN: '/sheriff-sale-data-between'

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

}
