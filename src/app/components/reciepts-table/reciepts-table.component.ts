import { Component, ViewChild } from '@angular/core';
import { Column } from '../receipt-files/receipt-files.component';
import { Reciept } from 'src/app/models/reciept.model';
import { Table } from 'primeng/table';
import { RecieptsTableService } from 'src/app/services/table/reciepts-table.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/services/utils.service';
import { FilesService } from 'src/app/services/azure-blob/files.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-reciepts-table',
  templateUrl: './reciepts-table.component.html',
  styleUrl: './reciepts-table.component.scss',
  
})
export class RecieptsTableComponent {


  @ViewChild('dt1') dt: Table | undefined;
  rangeDates: Date[] | undefined;
  logs: Reciept[] = [];
  loading: boolean = false;
  cols!: Column[];

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;


  constructor(private logService: RecieptsTableService,private recieptsService: ReceiptService
  ) {

  }


  ngOnInit() {
    this.cols = [
      { header: 'ID', field: 'id' },
      { header: 'Invoice ID', field: 'invoice_id' },
      { header: 'Company Name', field: 'company_name' },
      { header: 'Purchesed By', field: 'customer_name' },
      { header: 'Spend Type', field: 'spend_type' },
      { header: 'Vendor', field: 'vendor' },
      { header: 'File Path', field: 'file_path' },
      { header: 'Total', field: 'total' },
      { header: 'Sub Total', field: 'sub_total' },
      { header: 'Tax', field: 'tax' },
      { header: 'Purchesed At', field: 'purchased_at' },
      { header: 'Vendor Address', field: 'vendor_address' },
      { header: 'Created At', field: 'created_at' },
      { header: 'Created By', field: 'created_by' },

    ];

    this.logs = this.logService.logData;
    this.logService.logSubject.subscribe((data) => {
      console.log(data);
      this.loading = true;
      this.logs = data;
      this.loading = false;
    });
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  refresh() {
    this.logService.getLogs();
  }

  deleteLog(log: Reciept) {
    this.recieptsService.deleteFile(log.file_path).subscribe(
      (output: { message: string }) => {
        this.isSubmissionSuccessful = true;
        this.submitStatus = output.message;
        this.refresh();
      },
      (error) => {
        this.submitStatus = error.error.message;
        this.isSubmissionSuccessful = false;
      }
    );
  }

  download(log: Reciept) {
    this.recieptsService.getFileBlob(log.file_path).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },
    (error) => {
      this.submitStatus = error.message;
      this.isSubmissionSuccessful = false;
    }
  );
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.logs);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'reciepts');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + EXCEL_EXTENSION
    );
  }

  
  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }
  exportFile() {
    console.log(this.rangeDates);
    const date: string[]|undefined = UtilsService.onDateRangeSelect(this.rangeDates);
    if (date != undefined) {
      const start_time = date[0];
      const end_time = date[1];
      this.recieptsService.getFileBetweenAsZipBlob(start_time, end_time).subscribe((blob) => {
        FilesService.saveFile(blob, "Reciepts.zip");

      });
    }
    }

  isRangeValid(): boolean{
    if (this.rangeDates) {
      
      return this.rangeDates[0]!==null && this.rangeDates[1]!==null;      
    }else{
      return false;
    }
  }

}
