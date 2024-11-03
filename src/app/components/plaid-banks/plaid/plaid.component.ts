import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';
import { PlaidOnExitArgs } from 'ngx-plaid-link';
import { PlaidOnEventArgs } from 'ngx-plaid-link';
import { Table } from 'primeng/table';
import { Account, Balance, Bank, Transaction } from 'src/app/models/charts/banks.chart.model';
import { ManageBankService } from 'src/app/services/plaid/manage.service';
import { PlaidApiService } from 'src/app/services/plaid/plaid-api/plaid-api.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-plaid',
  templateUrl: './plaid.component.html',
  styleUrl: './plaid.component.scss',
})
export class PlaidComponent implements OnInit {


  @ViewChild('dt1') dt: Table;  // Reference to the PrimeNG table
  linkToken: string | null = null;
  banks: Bank[] = [];
  selectedBank: Bank | null = null;
  selectedAccount: Account | null = null;
  availableBalance: number = 0;
  currentBalance: number = 0;
  transactions: Transaction[] = [];
  rangeDates: Date[] | undefined;

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;


  constructor(private plaidApi: PlaidApiService,private manageBankService: ManageBankService ) {

  }

  ngOnInit() {
    this.linkToken = this.manageBankService.linkToken;
    this.selectedBank = this.manageBankService.selectedBank;

    this.selectedAccount = this.manageBankService.selectedAccount;
    this.rangeDates = this.manageBankService.secondaryRangeDates;
    this.availableBalance = this.manageBankService.availableBalance;
    this.currentBalance = this.manageBankService.currentBalance;
    this.transactions = this.manageBankService.transactions;

 



    this.banks = this.manageBankService.banks

    this.manageBankService.bankSubject.subscribe((data: Bank[]) => {
      this.banks = data;
    })

    this.manageBankService.linkTokenSubject.subscribe((data: string) => {
      this.linkToken = data;
    })
  }

  onPlaidSuccess($event: PlaidOnSuccessArgs) {
    console.log('Plaid Success:', $event);
    console.log('Public Token:', $event.metadata.public_token);
    this.plaidApi.createAccessToken($event.metadata.public_token,
      $event.metadata.institution.institution_id,
      $event.metadata.institution.name, $event.metadata.accounts)
      .subscribe(
        (data: {message: string}) => {
          console.log(data.message);
          this.refresh()
        },
        (error) => {
          console.error('Error while sending public token:', error)
          this.submitStatus = error.error.message;
          this.isSubmissionSuccessful = false;
        }
    )
  }
  onPlaidExit($event: PlaidOnExitArgs) {
    console.log('Plaid Exit:', $event);
  }
  onPlaidLoad($event: any) {
    console.log('Plaid Loaded:', $event);
  }
  onPlaidEvent($event: PlaidOnEventArgs) {
    console.log('Plaid Event:', $event);
  }
  onPlaidClick($event: any) {
    console.log('Plaid Click:', $event);
  }
  onBankSelect(bank: Bank) {
    this.selectedBank = bank;
    this.selectedAccount = null;  // Reset account when bank changes
    this.manageBankService.selectedBank = this.selectedBank;

  }
  onAccountSelect(account: Account) {
    this.selectedAccount = account;
    this.manageBankService.selectedAccount = account;
  }

  fetchAccountDetails() {

    console.log('Fetching account details for Account:', this.selectedAccount);
    console.log('Fetching account details for Bank:', this.selectedBank);
//  check if the user is using the same date range and bank as before
    if (this.manageBankService.secondaryRangeDates == this.rangeDates && this.manageBankService.bankDetails != null 
      && this.manageBankService.bankDetails.balance.some(b => b.account_id == this.selectedAccount.account_id)) {
      console.log('Using cached data');
      this.populateBankDetails(this.manageBankService.bankDetails);

      
    } else {
      
      const date: string[]|undefined = UtilsService.onDateRangeSelect(this.rangeDates);
      
      this.plaidApi.getTransactions(this.selectedBank.id, date[0], date[1])
      .subscribe(data  => {
        // set data to verify if the date range has changed later
        this.manageBankService.secondaryRangeDates = this.rangeDates;
        this.manageBankService.bankDetails = data;

        console.log(data);
        this.populateBankDetails(data);
  
      },
      (error) => {
        console.error('Error while fetching transactions:', error)
        this.submitStatus = error.error.message;
        this.isSubmissionSuccessful = false;
      })
    }


  }

  populateBankDetails(data: {transactions: Transaction[] ,total_transactions: number,balance:Balance[]}) {
    console.log('Data:', data.balance);
    const balance: Balance = data.balance.filter(b => b.account_id == this.selectedAccount.account_id)[0];
    this.availableBalance = balance.balances_available;
    this.manageBankService.availableBalance = this.availableBalance;
    this.currentBalance = balance.balances_current;
    this.manageBankService.currentBalance = this.currentBalance;
    console.log('Available Balance:', this.availableBalance);
    console.log('Current Balance:', this.currentBalance);
    this.transactions = data.transactions.filter(t => t.account_id == this.selectedAccount.account_id);
    this.manageBankService.transactions = this.transactions;
    console.log('Transactions:', this.transactions);
  }

exportExcel() {
  // Define file name for the exported Excel file
  const fileName = 'transactions.xlsx';

  // Get the transactions array to be exported
  const exportData = this.transactions.map(transaction => {
    return {
      Date: transaction.date,
      AuthorizedDate: transaction.authorized_date,
      Name: transaction.name,
      MerchantName: transaction.merchant_name,
      Amount: transaction.amount,
      PaymentChannel: transaction.payment_channel,
      Pending: transaction.pending,
      Website: transaction.website
    };
  });

  // Create a new worksheet from the data
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

  // Export the workbook to Excel format
  XLSX.writeFile(wb, fileName);
}

    refresh() {
      this.manageBankService.setup();
    }


    isDisabled() {
      try {
        const date: string[]|undefined = UtilsService.onDateRangeSelect(this.rangeDates);

        if (date == undefined || this.selectedAccount==null||this.selectedBank == null) {
          return true;
        }else{
          return false;
        }
      }catch (error) {
        console.log(error);
        return false
      }

    }
    clearSubmitStatus() {
      this.submitStatus = null;
      this.isSubmissionSuccessful = null;
    }
}