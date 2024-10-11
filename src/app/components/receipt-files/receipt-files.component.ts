import { ChangeDetectorRef, Component, NgZone, Renderer2 } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ReceiptService } from 'src/app/services/receipt.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesService } from 'src/app/services/azure-blob/files.service';
import { Column } from 'src/app/models/column.model';



@Component({
  selector: 'app-receipt-files',
  templateUrl: './receipt-files.component.html',
  styleUrls: ['./receipt-files.component.scss'],
})
export class ReceiptFilesComponent {

  filterMode = 'lenient';

  files!: TreeNode[];

  cols!: Column[];

  expandAllState = false;

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;


  constructor(
    private recieptService: ReceiptService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private filesService: FilesService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search.svg')
    );
  }

  ngOnInit() {
      this.files= this.filesService.files
      this.filesService.filesSubject.subscribe((files: TreeNode[]) => {
        this.files = files;
      });

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
    ];
  }
  
  deleteFile(file: any) {
    console.log(file);
    
    this.recieptService.deleteFile(file.path).subscribe(
      (output: { message: string }) => {
        console.log(output);
        this.isSubmissionSuccessful = true;
        this.submitStatus = output.message;
        this.filesService.getFiles();
      },
      (error) => {
        console.log(error);
        this.submitStatus = error.error.message;
        this.isSubmissionSuccessful = false;
      }
    
    );
  }
  downloadFile(file: any) {
    this.filesService.downloadFile(file.path);
  }
  // rewrite this method to display the file
  displayFile(file: any) {
    console.log(file);
    this.filesService.viewFile(file.path);

  }
  
  isFile(node: TreeNode): boolean {
    return node.type === 'File';
  }

  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }

  refresh() {
    this.filesService.getFiles();
  }
  expandAll() {
    this.expandAllState = !this.expandAllState;
    this.expandRecursive(this.files, this.expandAllState);
  }
  expandRecursive(nodes: TreeNode[], isExpand: boolean) {
    if (nodes) {
      nodes.forEach(node => {
        node.expanded = isExpand;
        this.expandRecursive(node.children, isExpand);
      });
    }
    
  }
  

}
