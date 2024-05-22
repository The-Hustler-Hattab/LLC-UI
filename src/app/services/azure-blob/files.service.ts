import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ReceiptService } from '../receipt.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  files!: TreeNode[];
  filesSubject: Subject<TreeNode[]> = new Subject<TreeNode[]>();

  constructor(private recieptService: ReceiptService) {
    this.getFiles();

  }

  getFiles() {
    this.recieptService
      .getListOfFilesBlob()
      .subscribe(
        (response) => {
          console.log(response);
          this.files = response;
          this.filesSubject.next(this.files);
        }
      );
  }


  downloadFile(file_path: string) {
    this.recieptService.getFileBlob(file_path).subscribe(
      (blob: Blob) => {
        FilesService.saveFile(blob, file_path);
      }
    );
  }

  public static saveFile(blobData: Blob, fileName: string) {
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(blobData);
    downloadLink.href = url;
    downloadLink.download = FilesService.getFileNameFromPath(fileName); 
    downloadLink.click();
    window.URL.revokeObjectURL(url); 
  }
  private static getFileNameFromPath(fullPath: string): string {
    const parts = fullPath.split('/');
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
    return fullPath; // Return the original string if no '/' is found
  }

  public viewFile(file_path: string) {
    this.recieptService.getFileBlob(file_path).subscribe(
      (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }
    );
  }


}
