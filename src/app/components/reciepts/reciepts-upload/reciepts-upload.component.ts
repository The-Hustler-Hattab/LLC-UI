import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AiAssisstedComponent } from './ai-assissted/ai-assissted.component';

@Component({
  selector: 'app-reciepts-upload',
  templateUrl: './reciepts-upload.component.html',
  styleUrl: './reciepts-upload.component.scss'
})
export class RecieptsUploadComponent {


  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    this.loadComponent('ai-assissted');

    }
   
    loadComponent(componentName: string): void {
      this.dynamicComponentContainer.clear();
      let componentType: any;
      if (componentName === 'ai-assissted') {
        componentType = AiAssisstedComponent;
      } 
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.dynamicComponentContainer.createComponent(componentFactory);
    }

}
