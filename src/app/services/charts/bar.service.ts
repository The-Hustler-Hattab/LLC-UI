import { Injectable } from '@angular/core';
import { ReceiptService } from '../receipt.service';
import { BarChartData, BarChartModel, ChartModel, DataSet } from 'src/app/models/bar.chart.model';
import { UtilsService } from '../utils.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  options: any;
  
  data: any;
  dataSubject: Subject<any> = new Subject<any>();
  barChartModel: BarChartModel;

  constructor(private reciept: ReceiptService) { 
    const documentStyle = getComputedStyle(document.documentElement);
    this.setOptions();

    this.getDefaultBarData();


  }

  public getBarData(startDate: string, endDate: string) {
    this.reciept.getBarChartData(startDate, endDate)
      .subscribe((data: { message: string; data_all: BarChartModel; }) => {
        this.barChartModel = data.data_all;
        this.setBarData(getComputedStyle(document.documentElement), this.barChartModel.total_amount);
        this.dataSubject.next(this.data);
      });
  }



  public getDefaultBarData() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.reciept.getBarChartData(UtilsService.getFirstDayOfYear(), UtilsService.getLastDayOfYear())
      .subscribe((data: { message: string; data_all: BarChartModel; }) => {
        this.barChartModel = data.data_all;
        console.log("bar data: "+JSON.stringify(this.barChartModel));
        this.setBarData(documentStyle, this.barChartModel.total_amount);
        this.dataSubject.next(this.data);
      });
  }

  setBarData(documentStyle: CSSStyleDeclaration, barData: ChartModel): void{
    this.data = {
      labels: barData.label,
      datasets: this.convertChartModelToBarChartData(barData),
    };
  }

  setOptions(): void{
    const documentStyle = getComputedStyle(document.documentElement);

    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

  }

  convertChartModelToBarChartData(chartModel: ChartModel): BarChartData[]{
    
    const barchartList: BarChartData[] = [];
    
    for (let i = 0; i < chartModel.data.length; i++) {
      const dataSet = chartModel.data[i];
      barchartList.push(this.convertDataSetToBarChartData(dataSet));
    }

    return barchartList;
  }

  convertDataSetToBarChartData(dataSet: DataSet): BarChartData{
    return {
      type: 'bar',
      label: dataSet.vendor,
      backgroundColor:  getComputedStyle(document.documentElement).getPropertyValue(dataSet.color),
      data: dataSet.data,
    };
  }

}
