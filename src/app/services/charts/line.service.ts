import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReceiptService } from '../receipt.service';
import { UtilsService } from '../utils.service';
import { LineHorizantalChartData, LineHorizantalChartDataItem } from 'src/app/models/line.chart.model';

@Injectable({
  providedIn: 'root',
})
export class LineService {
  dataSubject: Subject<any> = new Subject<any>();
  lineChartModel: LineHorizantalChartData;
  data: any;
  options: any;

  constructor(private reciept: ReceiptService) {
    this.setOptions();
    this.getDefaultPieData();
  }
  public getLineDataByDate(startDate: string, endDate: string) {
    this.reciept
      .getLineChartData(startDate, endDate)
      .subscribe((data: { message: string; data_all: LineHorizantalChartData }) => {
        this.lineChartModel = data.data_all;
        this.setLineData(
          getComputedStyle(document.documentElement),
          this.lineChartModel
        );
        this.dataSubject.next(this.data);
      });
  }
  public getDefaultPieData() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.reciept.getLineChartData(UtilsService.getFirstDayOfYear(), UtilsService.getLastDayOfYear())
      .subscribe((data: { message: string; data_all: LineHorizantalChartData; }) => {
        this.lineChartModel = data.data_all;
        console.log("line data: "+JSON.stringify(this.lineChartModel));
        this.setLineData(documentStyle, this.lineChartModel);
        this.dataSubject.next(this.data);
      });
  }
  setLineData(documentStyle: CSSStyleDeclaration, chartData: LineHorizantalChartData) {
    this.data = {
      labels: chartData.total_amount.label,
      datasets: [
          {
              label: 'Total Amount',
              data: chartData.total_amount.data,
              fill: false,
              borderColor: documentStyle.getPropertyValue(chartData.total_amount.borderColor),
              tension: 0.4
          },
          {
              label: 'Total Amount Subtotal',
              data: chartData.total_amount_subtotal.data,
              fill: false,
              borderColor: documentStyle.getPropertyValue(chartData.total_amount_subtotal.borderColor),
              tension: 0.4
          },
          {
              label: 'Total Tax',
              data: chartData.total_tax.data,
              fill: false,
              borderColor: documentStyle.getPropertyValue(chartData.total_tax.borderColor),
              tension: 0.4
          }
      ]
  };
  }


  setOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
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
}
