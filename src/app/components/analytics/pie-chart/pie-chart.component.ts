import { Component, OnInit } from '@angular/core';
import { PieService } from 'src/app/services/charts/pie.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {


  rangeDates: Date[] | undefined;

  data: any;

  options: any;

  refresh() {
    this.pieChartService.getDefaultPieData();
  }

  constructor(private pieChartService: PieService) {}


  ngOnInit() {
    this.options = this.pieChartService.options;
    this.data = this.pieChartService.data;

    this.pieChartService.dataSubject.subscribe((data) => {
      this.data = data;
    });
  }

  onDateRangeSelect($event: Date) {
    console.log($event);
    console.log(this.rangeDates);
    const date: string[]|undefined = UtilsService.onDateRangeSelect(this.rangeDates);
    if (date != undefined) {
      const start_time = date[0];
      const end_time = date[1];
      this.pieChartService.getPieDataByDate(start_time, end_time);
    }
  }
  changeChartType(chartType: string) {
    this.pieChartService.changeChartType(chartType);
  }

}
