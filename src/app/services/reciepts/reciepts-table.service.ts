import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Receipt } from 'src/app/models/reciept.model';
import { ReceiptService } from './reciepts-api/receipt.service';

@Injectable({
  providedIn: 'root'
})
export class RecieptsTableService {

  logSubject: Subject<Receipt[]> = new Subject<Receipt[]>();
  logData: Receipt[] = []

  constructor(private recieptsService: ReceiptService) { 
    this.getLogs();
  }

  public getLogs() {
    this.recieptsService.getListOfReceipts().subscribe((data:  { receipts: Receipt[], msg: string }) => { 
      console.log("Data: "+data.receipts);
      this.logData = data.receipts;
      this.logSubject.next(this.logData); 
    });
  }


}
