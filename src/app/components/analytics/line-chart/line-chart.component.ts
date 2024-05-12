import { Component, OnInit } from '@angular/core';
import { LineService } from 'src/app/services/charts/line.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  rangeDates: Date[] | undefined;
  data: any;

  options: any;

  constructor(private lineChartService: LineService) {}

  refresh() {
    this.lineChartService.getDefaultPieData();
  }

  ngOnInit() {
    this.options = this.lineChartService.options;
    this.data = this.lineChartService.data;

    this.lineChartService.dataSubject.subscribe((data) => {
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
      this.lineChartService.getLineDataByDate(start_time, end_time);
    }
  }
}
