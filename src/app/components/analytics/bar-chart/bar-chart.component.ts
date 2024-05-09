import { Component, OnInit } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { BarService } from 'src/app/services/charts/bar.service';
import { DatePipe } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {

  rangeDates: Date[] | undefined;

  data: any;

  options: any;
  constructor(private barChartService: BarService, private datePipe: DatePipe) {}

  onDateRangeSelect($event: Date) {
    console.log($event);
    console.log(this.rangeDates);
    if (this.rangeDates!=undefined && this.rangeDates.length == 2) {
      let endDate = this.rangeDates[1]; // Second date in the range
      endDate = this.getLastDayOfMonth(endDate); // Convert to last day of the month
      
      const start_time = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd') || '';
      const formattedEndDate = this.formatDate(endDate);
      this.barChartService.getBarData(start_time, formattedEndDate);

    }

  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }


  refresh() {
    this.barChartService.getDefaultBarData();

  }



  ngOnInit() {
    this.options = this.barChartService.options;
    this.data = this.barChartService.data;

    this.barChartService.dataSubject.subscribe((data) => {
      this.data = data;
    });
  }




}