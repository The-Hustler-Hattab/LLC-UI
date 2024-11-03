import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Column } from 'src/app/models/column.model';
import { Receipt } from 'src/app/models/reciept.model';
import { FilesService } from 'src/app/services/azure-blob/files.service';
import { ReceiptService } from 'src/app/services/reciepts/reciepts-api/receipt.service';
import { RecieptsTableService } from 'src/app/services/reciepts/reciepts-table.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as FileSaver from 'file-saver';
import { ContractorService } from 'src/app/services/contractor/contractor.service';
import { ContractorAPI } from 'src/app/models/contractor/contractor.api.model';
import { ContractorApiService } from 'src/app/services/contractor/contractor-api/contractor-api.service';

@Component({
  selector: 'app-contractors-table',
  templateUrl: './contractors-table.component.html',
  styleUrl: './contractors-table.component.scss'
})
export class ContractorsTableComponent {

  @ViewChild('dt1') dt: Table | undefined;
  contractorsTable: ContractorAPI[] = [];
  cols!: Column[];

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;


  constructor(private contractorService: ContractorService ,private contractorApiService: ContractorApiService
  ) {

  }


  ngOnInit() {
    this.cols = [
      { header: 'ID', field: 'id' },
      { header: 'Contractor Name', field: 'contractor_name' },
      { header: 'Contractor Skills', field: 'contractor_skill' },
      { header: 'Phone Number', field: 'phone_number' },
      { header: 'Job Cost', field: 'job_cost' },
      { header: 'Comment', field: 'comment' },
      { header: 'Quote File Location', field: 'quote_file_location' },
      { header: 'Created At', field: 'created_at' },
      { header: 'Created By', field: 'created_by' },

    ];

    this.contractorsTable = this.contractorService.contractors;
    this.contractorService.contractorsSubject.subscribe((data) => {
      console.log(data);
      this.contractorsTable = data;
    });
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  refresh() {
    this.contractorService.getContractors();
  }

  deleteLog(contractor: ContractorAPI) {
    this.contractorApiService.deleteContractors(contractor.id).subscribe(
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

  download(contractor: ContractorAPI) {
    this.contractorApiService.getContractorFile(contractor.quote_file_location)
    .subscribe((blob) => {
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
      const worksheet = xlsx.utils.json_to_sheet(this.contractorsTable);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Contractors');
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




}
