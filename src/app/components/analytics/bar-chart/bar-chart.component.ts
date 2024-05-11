import { Component, OnInit } from '@angular/core';

import { BarService } from 'src/app/services/charts/bar.service';
import { DatePipe } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {

  rangeDates: Date[] | undefined;

  data: any;

  options: any;
  constructor(private barChartService: BarService) {}

  onDateRangeSelect($event: Date) {
    console.log($event);
    console.log(this.rangeDates);
    const date: string[]|undefined = UtilsService.onDateRangeSelect(this.rangeDates);
    if (date != undefined) {
      const start_time = date[0];
      const end_time = date[1];
      this.barChartService.getBarData(start_time, end_time);
    }
  }
  

  refresh() {
    this.barChartService.getDefaultBarData();
  }

  changeChartType(chartType: string) {
    this.barChartService.changeChartType(chartType);
  }


  ngOnInit() {
    this.options = this.barChartService.options;
    this.data = this.barChartService.data;

    this.barChartService.dataSubject.subscribe((data) => {
      this.data = data;
    });
  }




}