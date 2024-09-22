import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { MasterSherifSale } from 'src/app/models/sheriff-sale/master.model';
import { SheriffSaleService } from 'src/app/services/sherif-sale/sheriff-sale.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-row-expand-table',
  templateUrl: './row-expand-table.component.html',
  styleUrl: './row-expand-table.component.scss',
})
export class RowExpandTableComponent {
  sheriffSaleData: MasterSherifSale[] = [];

  expandedRows: { [key: string]: boolean } = {};
  expandedRowsSecondLevel: { [key: string]: boolean } = {};

  rangeDates: Date[] | undefined;

  constructor(private messageService: MessageService, private sheriffSaleService :SheriffSaleService) {}

  onRowToggle(event: { [key: string]: boolean }) {
    this.expandedRows = event;
  }

  toggleRow(product: MasterSherifSale) {
    if (this.expandedRows[product.id!]) {
      delete this.expandedRows[product.id!];
    } else {
      this.expandedRows[product.id!] = true;
    }
  }

  ngOnInit() {

    this.sheriffSaleData = this.sheriffSaleService.sheriffSaleData;
    this.sheriffSaleService.sheriffSaleDataSubject.subscribe((data) => {
        this.sheriffSaleData = data;
    });

    // this.sheriffSaleData = [
    //   {
    //     created_at: '2024-08-29T22:15:55',
    //     created_by: 'SherifSale',
    //     file_hash: '4d14e8638a7485c282ae3f9efc71ec227f4bbc2733fe4af015d91fce25b6d33c',
    //     file_name: '2024-08-29_22-15-55_september-sale-list.pdf',
    //     file_path: '2024-08-03/2024-08-29_22-15-55_september-sale-list.pdf',
    //     id: 91,
    //     pages_size: 57,
    //     sheriff_sale_date: '',

    //     sherif_sale_children: [
    //       {
    //         created_at: '2024-08-29T22:15:56',
    //         created_by: 'SherifSale',
    //         file_hash: '51da7bf111af2fb5b8ac5b4581c22931c894624f1618d60e3fec871ff8a4f26a',
    //         file_name: '2024-08-29_22-15-55_file_page_2.pdf',
    //         file_path: '2024-08-03/2024-08-29_22-15-55_file_page_2.pdf',
    //         id: 752,
    //         sherif_sale_master_id: 91,
    //         sheriff_sale_date: '2024-09-03',
    //         sherif_sale_properties: [
    //           {
    //             SHERIEF_SALE_CHILD_ID: 803,
    //             amount_in_dispute: null,
    //             attorney_for_plaintiff: 'GRENEN & BIRSIC P.C.',
    //             bathrooms: '2',
    //             bedrooms: '2',
    //             case_number: 'GD-24-003482',
    //             city: 'Pittsburgh',
    //             comments: '',
    //             construction_materials: '["Frame"]',
    //             cooling: '["Central"]',
    //             cost_tax_bid: '$1,786.28',
    //             county: 'Allegheny',
    //             created_at: '2024-08-30T02:16:29',
    //             created_by: 'SherifSale',
    //             defendant: 'Byzek, Paul J.',
    //             events: "EventModel(date='2003-02-28', price=900, pricePerSquareFoot=0, event='Sold', source='Public Record')\nEventModel(date='2002-10-31', price=1061, pricePerSquareFoot=1, event='Sold', source='Public Record')",
    //             exterior: '["Wood"]',
    //             heating: '["Other"]',
    //             home_type: 'MANUFACTURED',
    //             id: 977,
    //             lot_size: '3,000 sqft',
    //             municipality: 'Braddock Hills',
    //             parcel_num: '0300E00245000000',
    //             parcel_tax_id: '300-E-245',
    //             parking: '["Garage - Attached"]',
    //             plaintiff: 'Dollar Bank Federal Savings Bank',
    //             property_address: '1000 Garfield Avenue - MOBILE HOME Pittsburgh, PA 15221',
    //             roof: 'Shake / Shingle',
    //             sale: '60SEP24',
    //             sale_type: 'Real Estate Sale - Mortgage Foreclosure',
    //             schools: 'School: Edgewood El School, Rating: 3, Level: Primary, Grades: PK-5, Type: Public\nSchool: Woodland Hills Academy, Rating: None, Level: Elementary, Grades: K-8, Type: Public\nSchool: Woodland Hills Senior High School, Rating: 3, Level: High, Grades: 9-12, Type: Public',
    //             square_foot: '1944',
    //             square_foot_range: '1500-1999',
    //             state: 'PA',
    //             status: 'Active',
    //             street: '1000 Garfield Ave',
    //             tracts: '1',
    //             year_built: '2000-2009',
    //             zestibuck: '150-199k',
    //             zestimate: '153700',
    //             zillow_link: 'https://www.zillow.com/homes/1000-Garfield-Avenue---MOBILE-HOME-Pittsburgh,-PA-15221_rb/',
    //             zip: '15221',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ];
  }

  expandAll() {
    this.expandedRows = {};
    this.sheriffSaleData.forEach((product) => {
      this.expandedRows[product.id!] = true;
      
      product.sherif_sale_children.forEach(
        (order) => {
          this.expandedRowsSecondLevel[order.id!] = true;
        }
      )
    });
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Expanded',
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000,
    });
  }


  toggleOrderRow(order) {
    this.expandedRowsSecondLevel[order.id!] =
      !this.expandedRowsSecondLevel[order.id!];
  }

  onDateRangeSelect($event: Date) {
    console.log($event);
    console.log(this.rangeDates);
    const date: string[]|undefined = UtilsService.onDateRangeSelect(this.rangeDates);
    if (date != undefined) {
      const start_time = date[0];
      const end_time = date[1];
      this.sheriffSaleService.getSheriffData(start_time, end_time);
    }
  }
}
  

