import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerServiceService } from 'src/app/services/loading-spinner-service.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  showSpinner: boolean = false;

  constructor(private lodingService: LoadingSpinnerServiceService){}
  ngOnInit(): void {
    
    this.lodingService.isLoading.subscribe((loading: boolean)=>{
      this.showSpinner = loading;
      console.log(loading);
      
    })
  }
}
