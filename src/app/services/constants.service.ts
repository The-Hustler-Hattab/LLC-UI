import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  public static readonly  EXPENSE_CATEGORY: string[] = ['HATTAB LLC', 'PERSONAL' ];
  public static readonly  HATTAB_LLC_COMPANY_MEMBERS: string[] = ['Mohammed Hattab', 'Haider Hattab', 'Ahmed Mushatet' ];  
  public static readonly  SPEND_TYPE: string[] = ['Technology', '88 Oakwood Rd','506 Oak Ave', 'Business Operations', 'Education',  'Legal', 'Marketing', 'Office Supplies', 'Professional Services', 'Travel', 'Utilities'];  
  public static readonly  INCOME_TYPE: string[] = ['House Sale','House Rent','Service'];  

  constructor() { }


}
