import { Injectable } from '@angular/core';
import { ReceiptService } from '../receipt.service';
import { Subject } from 'rxjs';
import { PieChartDataItem, PieData } from 'src/app/models/pie.chart.model';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root',
})
export class PieService {
  dataSubject: Subject<any> = new Subject<any>();
  pieChartModel: PieData;
  data: any;
  options: any;

  
  constructor(private reciept: ReceiptService) {
    this.setOptions();
    this.getDefaultPieData();
  }

  public getDefaultPieData() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.reciept.getPieChartData(UtilsService.getFirstDayOfYear(), UtilsService.getLastDayOfYear())
      .subscribe((data: { message: string; data_all: PieData; }) => {
        this.pieChartModel = data.data_all;
        console.log("pie data: "+JSON.stringify(this.pieChartModel));
        this.setPieData(documentStyle, this.pieChartModel.total_amount);
        this.dataSubject.next(this.data);
      });
  }


  public getPieDataByDate(startDate: string, endDate: string) {
    this.reciept
      .getPieChartData(startDate, endDate)
      .subscribe((data: { message: string; data_all: PieData }) => {
        this.pieChartModel = data.data_all;
        this.setPieData(
          getComputedStyle(document.documentElement),
          this.pieChartModel.total_amount
        );
        this.dataSubject.next(this.data);
      });
  }

  setPieData(
    documentStyle: CSSStyleDeclaration,
    pieData: PieChartDataItem
  ): void {
    this.data = {
      labels: pieData.label,
      datasets: [{
        data: pieData.data,
        backgroundColor: this.getColors(pieData.backgroundColor, documentStyle),
        hoverBackgroundColor: this.getColors(pieData.hoverBackgroundColor, documentStyle),
      }],
    };
  }

  getColors(colors: string[], documentStyle: CSSStyleDeclaration): string[] {
    const newColors  = []
    for (let i = 0; i < colors.length; i++) {
      newColors.push(documentStyle.getPropertyValue(colors[i]));
    }
    console.log("colors: "+colors);
    return newColors;
  }




  setOptions(): void{
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };

  }

  public changeChartType(type: string){
    if (type == 'total_amount_subtotal') {
      this.setPieData(getComputedStyle(document.documentElement), this.pieChartModel.total_amount_subtotal);
      this.dataSubject.next(this.data);
    }else if (type == 'total_tax') {
      this.setPieData(getComputedStyle(document.documentElement), this.pieChartModel.total_tax);
      this.dataSubject.next(this.data);
    }else if (type == 'total_amount') {
      this.setPieData(getComputedStyle(document.documentElement), this.pieChartModel.total_amount);
      this.dataSubject.next(this.data);
    }

  }




}



