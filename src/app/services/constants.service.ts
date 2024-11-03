import { Injectable } from '@angular/core';
import { ContractorSpecialty } from '../models/contractor/contractor.specility';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  public static readonly  EXPENSE_CATEGORY: string[] = ['HATTAB LLC', 'PERSONAL' ];
  public static readonly  HATTAB_LLC_COMPANY_MEMBERS: string[] = ['Mohammed Hattab', 'Haider Hattab', 'Ahmed Mushatet' ];  
  public static readonly  SPEND_TYPE: string[] = ['Technology', '88 Oakwood Rd','506 Oak Ave', 'Business Operations', 'Education',  'Legal', 'Marketing', 'Office Supplies', 'Professional Services', 'Travel', 'Utilities'];  
  public static readonly  INCOME_TYPE: string[] = ['House Sale','House Rent','Service'];  

  public static readonly CONTRACTORS_SPECIALTIES: ContractorSpecialty[] = [
    {name:'Plumber' }, 
    {name: 'Electrician' }, {name: 'HVAC' },{name:'Boiler' },{name:'Pest Control' },
     {name:'Carpenter' }, {name: 'Foundation' },{name:'Deck Builder' }, {name: 'Roofer' },
     {name: 'Painter' }, {name: 'Flooring' }, {name: 'Concrete' },{name:'Demolishing' }, {name: 'Masonry' },
     {name:'Landscaping' }, {name: 'General Contractor' }, {name: 'Other' }];




}
