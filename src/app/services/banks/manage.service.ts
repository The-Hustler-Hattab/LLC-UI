import { Injectable } from '@angular/core';
import { PlaidApiService } from '../plaid-api.service';
import { Account, Balance, Bank, Transaction } from 'src/app/models/banks.chart.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBankService {
  banks!: Bank[];
  bankSubject: Subject<Bank[]> = new Subject<Bank[]>();
  
  linkToken: string | null = null;
  linkTokenSubject: Subject<string> = new Subject<string>();

  

  bankDetails: {transactions: Transaction[] ,total_transactions: number,balance:Balance[]} = null;
  secondaryRangeDates: Date[] | undefined; // used to verify if the date range has changed
  selectedBank: Bank | null = null;
  selectedAccount: Account | null = null;
  transactions: Transaction[] = [];
  availableBalance: number = 0;
  currentBalance: number = 0;

  constructor(private plaidApi: PlaidApiService ) {
    this.setup();
  }
  setup() {
    this.getAllBanks();
    this.getLinkToken();
  }


  getLinkToken() {
    this.plaidApi.createLinkToken()
    .subscribe(
      (data: {link_token: string,expiration: string,request_id: string } ) => {
      this.linkToken = data.link_token;
      this.linkTokenSubject.next(this.linkToken);
    });
  }

  getAllBanks() {
    this.plaidApi.getAllBanks().subscribe(data => {
      this.banks = data.banks;
      this.bankSubject.next(this.banks);
    });
  }
}
