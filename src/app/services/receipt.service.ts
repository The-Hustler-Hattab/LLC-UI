import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reciept } from '../models/reciept.model';
import { TreeNode } from '../models/treeNode.model';
import { BarChartModel } from '../models/bar.chart.model';
import { PieData } from '../models/pie.chart.model';
import { LineHorizantalChartData } from '../models/line.chart.model';

export const ApiConstants = {
  // BLOB CONTROLLER
  GET_FILE: '/get-file',
  GET_LIST_OF_FILES: '/get-list-of-files',
  GET_FILES_BETWEEN_AS_ZIP: '/files-between',
  DELETE_FILE: '/delete-file', // ADD '?blob_name={path}'

  // RECEIPT CONTROLLER
  GET_LIST_OF_RECEIPTS: '/get-list-of-receipts',
  POST_PROCESS_RECIPTS: '/process-receipts', // ADD '/{company_name}/{customer_name}'
  POST_PROCESS_RECIPTS_AI_ASSISSTED: '/process-receipts-ai-assisted', // ADD
  POST_STORE_RECIPTS_AI_ASSISSTED: '/store-receipts-ai-assisted', 
  DELETE_BY_ID: '/delete-by-id',

  // ANALYTICS CONTROLLER
  GET_BAR_CHART_DATA: '/get-bar-chart-data',
  GET_PIE_CHART_DATA: '/get-pie-chart-data',
  GET_LINE_CHART_DATA: '/get-line-chart-data',
  GET_HORIZANTAL_CHART_DATA: '/get-horizontal-chart-data',

  // HEALTH CONTROLLER
  GET_HEALTH: '/health',
};
/**
 * Service for interacting with receipt-related APIs.
 * Provides methods to retrieve, process, and manage receipts.
 */
@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
    /**
   * Base URL of the receipt Flask API.
   */
  private apiUrl = environment.receiptFlaskApi;

  constructor(private http: HttpClient) {}
  /**
   * Retrieves a list of files from the Blob controller.
   * @returns An observable of TreeNode[], representing the list of files.
   */
  getListOfFilesBlob(): Observable<TreeNode[]> {
    const url = `${this.apiUrl}${ApiConstants.GET_LIST_OF_FILES}`;

    console.log(url);

    return this.http
      .get<{ files: TreeNode[] }>(url)
      .pipe(map((response) => response.files));
  }
  /**
   * Retrieves a file as a Blob from the Blob controller.
   * @param path The path of the file to retrieve.
   * @returns An observable of Blob, representing the file.
   */
  getFileBlob(path: string): Observable<Blob>{
    const url = `${this.apiUrl}${ApiConstants.GET_FILE}?path=${path}`;
    return this.http.get(url, { responseType: 'blob' })
  
  }
  getFileBetweenAsZipBlob(start_date: string,end_date: string): Observable<Blob>{
    const url = `${this.apiUrl}${ApiConstants.GET_FILES_BETWEEN_AS_ZIP}?start_date=${start_date}&end_date=${end_date}`;
    return this.http.get(url, { responseType: 'blob' })
  
  }

  /**
   * Processes receipts by uploading a file along with company and customer names to the Receipt controller.
   * @param company_name The name of the company which made the purchase.
   * @param customer_name The name of the customer which made the purchase.
   * @param file The PDF file to upload for processing.
   * @returns An observable representing the result of the processing.
   */
  processReceipts(company_name: string, customer_name: string, spend_type:string, file: File): Observable<{message: string}> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}${ApiConstants.POST_PROCESS_RECIPTS}/${company_name}/${customer_name}/${spend_type}`;

    return this.http.post<{message: string}>(url, formData);
  }

  processReceiptsAIAssissted(file: File): Observable<{message: string, document_details: Reciept}> {
    
    const formData = new FormData();
    formData.append('file', file);
    console.log("file: "+file);
    const url = `${this.apiUrl}${ApiConstants.POST_PROCESS_RECIPTS_AI_ASSISSTED}`;

    return this.http.post<{message: string, document_details: Reciept}>(url, formData);
  }

  storeReceiptsAIAssissted(file: File,total:number,sub_total:number,tax:number,company_name: string,
    vendor:string,purchased_at:string,vendor_address:string,customer_name:string,invoice_id:string,spend_type:string
    ,sha256:string
  ): Observable<{message: string}> {
    console.log("date: "+purchased_at);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('total',total.toString());
    formData.append('sub_total',sub_total.toString());
    formData.append('tax',tax.toString());
    formData.append('company_name',company_name);
    formData.append('vendor',vendor);
    formData.append('purchased_at',purchased_at);
    formData.append('vendor_address',vendor_address);
    formData.append('customer_name',customer_name);
    formData.append('invoice_id',invoice_id);
    formData.append('spend_type',spend_type); 
    formData.append('sha256',sha256);

    const url = `${this.apiUrl}${ApiConstants.POST_STORE_RECIPTS_AI_ASSISSTED}`;

    return this.http.post<{message: string}>(url, formData);
  }

 /**
   * Retrieves a list of receipts from the Receipt controller.
   * @returns An observable of Reciept[], representing the list of receipts.
   */
  getListOfReceipts(): Observable<{ receipts: Reciept[], msg: string }> {
    const url = `${this.apiUrl}${ApiConstants.GET_LIST_OF_RECEIPTS}`;

    console.log(url);

    return this.http
      .get<{ receipts: Reciept[], msg: string }>(url);
  }

  /**
   * Deletes a file from the Blob controller.
   * @param path The path of the file to delete.
   * @returns An observable representing the result of the deletion.
   */
  deleteFile(path: string): Observable<{ message: string }> {
    const url = `${this.apiUrl}${ApiConstants.DELETE_FILE}?blob_name=${path}`;
    return this.http.delete<{ message: string }>(url);

  }

    /**
   * Deletes a row from the the table.
   * @param id The id of the row to delete.
   * @returns An observable representing the result of the deletion.
   */
    deleteById(id: number): Observable<{ message: string }> {
      const url = `${this.apiUrl}${ApiConstants.DELETE_BY_ID}?id=${id}`;
      return this.http.delete<{ message: string }>(url);
  
    }

    getBarChartData(start_date, end_date): Observable<{message: string, data_all: BarChartModel}> {
      const url = `${this.apiUrl}${ApiConstants.GET_BAR_CHART_DATA}?start_date=${start_date}&end_date=${end_date}`;
      return this.http.get<{message: string, data_all: BarChartModel}>(url);
    }

    getPieChartData(start_date, end_date): Observable<{message: string, data_all: PieData}> {
      const url = `${this.apiUrl}${ApiConstants.GET_PIE_CHART_DATA}?start_date=${start_date}&end_date=${end_date}`;
      return this.http.get<{message: string, data_all: PieData}>(url);
    }
    
    getLineChartData(start_date, end_date): Observable<{message: string, data_all: LineHorizantalChartData}> {
      const url = `${this.apiUrl}${ApiConstants.GET_LINE_CHART_DATA}?start_date=${start_date}&end_date=${end_date}`;
      return this.http.get<{message: string, data_all: LineHorizantalChartData}>(url);
    }
    
    getHorizontalChartData(start_date, end_date): Observable<{message: string, data_all: LineHorizantalChartData}> {
      const url = `${this.apiUrl}${ApiConstants.GET_HORIZANTAL_CHART_DATA}?start_date=${start_date}&end_date=${end_date}`;
      return this.http.get<{message: string, data_all: LineHorizantalChartData}>(url);
    }

}
