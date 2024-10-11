import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Balance, Bank, Transaction } from '../models/banks.chart.model';


export const ApiConstants = {
  CREATE_LINK_TOKEN: '/create-link-token',
  CREATE_EXCHANGE_TOKEN: '/exchange-public-token',
  GET_ALL_BANKS: '/get-all-banks',
  GET_TRANSACTIONS: '/get-transactions',
  DELETE_BANK_BY_ID: '/delete-by-bank-id'
}

@Injectable({
  providedIn: 'root'
})
export class PlaidApiService {
  private apiUrl = environment.receiptFlaskApi;
  
  constructor(private http: HttpClient) {}


  createLinkToken(): Observable<{link_token: string,expiration: string,request_id: string }> {
    const url = `${this.apiUrl}${ApiConstants.CREATE_LINK_TOKEN}`;
    return this.http.post<{link_token: string,expiration: string,request_id: string }>(url, {});
  }

  createAccessToken(publicToken: string,
     institutionId: string,
     institutionName: string, accounts ): Observable<{message: string}> {
    
      const url = `${this.apiUrl}${ApiConstants.CREATE_EXCHANGE_TOKEN}`;
      
      const body = {
        public_token: publicToken,
        institution_id: institutionId,
        institution_name: institutionName,
        accounts: accounts
      }
      console.log("body: "+body);
      return this.http.post<{message: string}>(url, body);
  }

  getAllBanks(): Observable<{banks: Bank[],message: string}> {
    const url = `${this.apiUrl}${ApiConstants.GET_ALL_BANKS}`;
    return this.http.get<{banks: Bank[],message: string}>(url);
  }

  getTransactions(bankId: number, startDate: string, endDate: string): 
  Observable<{transactions: Transaction[] ,total_transactions: number,balance:Balance[]}> {
    console.log("bankId: "+bankId);
    console.log("startDate: "+startDate);
    console.log("endDate: "+endDate);

    const url = `${this.apiUrl}${ApiConstants.GET_TRANSACTIONS}?bank_id=${bankId}&start_date=${startDate}&end_date=${endDate}`;

    return this.http.get<{transactions: Transaction[] ,total_transactions: number,balance:Balance[]}>(url);

  }

  deleteByBankId(bankId: number): Observable<{message: string}> {
    const url = `${this.apiUrl}${ApiConstants.DELETE_BANK_BY_ID}/${bankId}`;
    return this.http.delete<{message: string}>(url);
  }

}
