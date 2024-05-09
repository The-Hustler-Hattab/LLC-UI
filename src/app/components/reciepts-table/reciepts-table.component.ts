import { Component, ViewChild } from '@angular/core';
import { Column } from '../receipt-files/receipt-files.component';
import { Reciept } from 'src/app/models/reciept.model';
import { Table } from 'primeng/table';
import { RecieptsTableService } from 'src/app/services/table/reciepts-table.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-reciepts-table',
  templateUrl: './reciepts-table.component.html',
  styleUrl: './reciepts-table.component.scss',
  
})
export class RecieptsTableComponent {
  @ViewChild('dt1') dt: Table | undefined;

  logs: Reciept[] = [];
  loading: boolean = false;
  cols!: Column[];

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;


  constructor(private logService: RecieptsTableService,private recieptsService: ReceiptService,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ) {

  }


  ngOnInit() {
    this.cols = [
      { header: 'ID', field: 'id' },
      { header: 'Invoice ID', field: 'invoice_id' },
      { header: 'Company Name', field: 'company_name' },
      { header: 'Purchesed By', field: 'customer_name' },
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
        this.submitStatus = error.message;
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

  
  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }


}