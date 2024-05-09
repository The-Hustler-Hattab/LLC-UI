import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

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




}
