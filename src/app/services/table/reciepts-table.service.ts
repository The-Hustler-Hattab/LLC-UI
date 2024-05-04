import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reciept } from 'src/app/models/reciept.model';
import { ReceiptService } from '../receipt.service';

@Injectable({
  providedIn: 'root'
})
export class RecieptsTableService {

  logSubject: Subject<Reciept[]> = new Subject<Reciept[]>();
  logData: Reciept[] = []

  constructor(private recieptsService: ReceiptService) { 
    this.getLogs();
  }

  public getLogs() {
    this.recieptsService.getListOfReceipts().subscribe((data:  { receipts: Reciept[], msg: string }) => { 
      console.log("Data: "+data.receipts);
      this.logData = data.receipts;
      this.logSubject.next(this.logData); 
    });
  }


}
