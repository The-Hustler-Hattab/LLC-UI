import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AiAssisstedComponent } from '../reciepts-upload/ai-assissted/ai-assissted.component';
import { FullAiComponent } from '../reciepts-upload/full-ai/full-ai.component';
import { RowExpandTableComponent } from './row-expand-table/row-expand-table.component';

@Component({
  selector: 'app-sheriff-sale',
  templateUrl: './sheriff-sale.component.html',
  styleUrl: './sheriff-sale.component.scss'
})
export class SheriffSaleComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    this.loadComponent('expansion-table');

    }
   
    loadComponent(componentName: string): void {
      this.dynamicComponentContainer.clear();
      let componentType: any;
      if (componentName === 'expansion-table') {
        componentType = RowExpandTableComponent;
      } 
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.dynamicComponentContainer.createComponent(componentFactory);
    }
}
