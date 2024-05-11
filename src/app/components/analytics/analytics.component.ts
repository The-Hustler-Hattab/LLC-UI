import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HorizontalChartComponent } from './horizontal-chart/horizontal-chart.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent 
 {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    this.loadComponent('pie-chart');

    }
   
    loadComponent(componentName: string): void {
      this.dynamicComponentContainer.clear();
      let componentType: any;
      if (componentName === 'bar-chart') {
        componentType = BarChartComponent;
      } else if (componentName === 'pie-chart') {
        componentType = PieChartComponent;
      } else if (componentName === 'line-chart') {
        componentType = LineChartComponent;
      }else if (componentName === 'horizontal-chart') {
        componentType = HorizontalChartComponent;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.dynamicComponentContainer.createComponent(componentFactory);
    }


}
