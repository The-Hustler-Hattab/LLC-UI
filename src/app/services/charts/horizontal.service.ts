import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LineHorizantalChartData } from 'src/app/models/line.chart.model';
import { ReceiptService } from '../receipt.service';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class HorizontalService {
  dataSubject: Subject<any> = new Subject<any>();
  horizantalChartModel: LineHorizantalChartData;
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
        this.horizantalChartModel = data.data_all;
        this.setHorizantalData(
          getComputedStyle(document.documentElement),
          this.horizantalChartModel
        );
        this.dataSubject.next(this.data);
      });
  }

  public getDefaultPieData() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.reciept.getHorizontalChartData(UtilsService.getFirstDayOfYear(), UtilsService.getLastDayOfYear())
      .subscribe((data: { message: string; data_all: LineHorizantalChartData; }) => {
        this.horizantalChartModel = data.data_all;
        console.log("horizantal data: "+JSON.stringify(this.horizantalChartModel));
        this.setHorizantalData(documentStyle, this.horizantalChartModel);
        this.dataSubject.next(this.data);
      });
  }
  setHorizantalData(documentStyle: CSSStyleDeclaration, chartData: LineHorizantalChartData) {
    this.data = {
      labels: chartData.total_amount.label,
      datasets: [
          {
              label: 'Total Amount',
              backgroundColor: documentStyle.getPropertyValue(chartData.total_amount.borderColor),
              borderColor: documentStyle.getPropertyValue(chartData.total_amount.borderColor),
              data: chartData.total_amount.data
          },
          {
            label: 'Total Amount Subtotal',
            backgroundColor: documentStyle.getPropertyValue(chartData.total_amount_subtotal.borderColor),
            borderColor: documentStyle.getPropertyValue(chartData.total_amount_subtotal.borderColor),
            data: chartData.total_amount_subtotal.data
        },
        {
          label: 'Total Tax',
          backgroundColor: documentStyle.getPropertyValue(chartData.total_tax.borderColor),
          borderColor: documentStyle.getPropertyValue(chartData.total_tax.borderColor),
          data: chartData.total_tax.data
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
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }


}
