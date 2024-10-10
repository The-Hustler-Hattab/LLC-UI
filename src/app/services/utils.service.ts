import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  static datePipe: DatePipe = new DatePipe('en-US');

  static getFirstDayOfYear(): string {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), 0, 1);  // January is 0 in JavaScript Date
    return firstDay.toISOString().split('T')[0];  // Splits the ISO string by 'T' and takes the date part
}
  static getLastDayOfYear(): string {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), 11, 31); // December is 11 in JavaScript Date, 31 is the last day
    return lastDay.toISOString().split('T')[0];  // Splits the ISO string by 'T' and takes the date part
  }

  static onDateRangeSelect( rangeDates: Date[] | undefined ) : string[] | undefined {
    if (rangeDates!=undefined && rangeDates.length == 2) {
      let endDate = rangeDates[1]; // Second date in the range
      endDate = this.getLastDayOfMonth(endDate); // Convert to last day of the month
      
      const start_time = this.datePipe.transform(rangeDates[0], 'yyyy-MM-dd') || '';
      const formattedEndDate = this.formatDate(endDate);
      return [start_time, formattedEndDate];
    }
    
    return undefined; // Add this line to return a value if the condition is not met
  }
  static formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  static getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }


}
