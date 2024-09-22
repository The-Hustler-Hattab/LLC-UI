import { Injectable } from '@angular/core';
import { SheriffSaleApiService } from '../sheriff-sale-api.service';
import { MasterSherifSale } from 'src/app/models/sheriff-sale/master.model';
import { Subject } from 'rxjs/internal/Subject';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class SheriffSaleService {
  sheriffSaleDataSubject: Subject<MasterSherifSale[]> = new Subject<MasterSherifSale[]>();
  sheriffSaleData: MasterSherifSale[] = [];
  
  
  constructor(private sheriffSaleApi : SheriffSaleApiService ) {
    this.getSheriffData(UtilsService.getFirstDayOfYear(), UtilsService.getLastDayOfYear());
   }

   public getSheriffData(start_date, end_date) {
    this.sheriffSaleApi.getSheriffSaleDataBetweenTwoDates(start_date,end_date)
    .subscribe((data) => { 
      console.log("Data: "+data.sheriff_data);
      this.sheriffSaleData = data.sheriff_data;
      this.sheriffSaleDataSubject.next(this.sheriffSaleData); 
    });
  }


}
