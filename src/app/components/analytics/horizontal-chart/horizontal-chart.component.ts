import { Component } from '@angular/core';
import { HorizontalService } from 'src/app/services/charts/horizontal.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrl: './horizontal-chart.component.scss'
})
export class HorizontalChartComponent {
  rangeDates: Date[] | undefined;
  data: any;

  options: any;
  constructor(private horizantalChartService: HorizontalService) {}
  refresh() {
    this.horizantalChartService.getDefaultPieData();
  }

  ngOnInit() {
    this.options = this.horizantalChartService.options;
    this.data = this.horizantalChartService.data;

    this.horizantalChartService.dataSubject.subscribe((data) => {
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
      this.horizantalChartService.getLineDataByDate(start_time, end_time);
    }
  }
}
