import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  public static readonly  COMPANIES: string[] = ['HATTAB LLC' ];
  public static readonly  COMPANY_MEMBERS: string[] = ['Mohammed Hattab', 'Haider Hattab', 'Ahmed Mushatet' ];  

  constructor() { }


}
