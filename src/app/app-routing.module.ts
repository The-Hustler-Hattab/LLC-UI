import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReceiptFilesComponent } from './components/receipt-files/receipt-files.component';
import { RecieptsUploadComponent } from './components/reciepts-upload/reciepts-upload.component';
import { RecieptsTableComponent } from './components/reciepts-table/reciepts-table.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ContactComponent } from './components/contact/contact.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LinksComponent } from './components/links/links.component';
import { SheriffSaleComponent } from './components/sheriff-sale/sheriff-sale.component';
import { IncomeComponent } from './components/income/income.component';
import { IncomeTableComponent } from './components/income-table/income-table.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"",redirectTo: "home", pathMatch: 'full'},
  {path:"about", component: AboutComponent},
  {path:"reciepts", component: ReceiptFilesComponent},
  {path:"reciepts-table", component: RecieptsTableComponent},
  {path:"reciepts-upload", component: RecieptsUploadComponent},
  {path:"analytics", component: AnalyticsComponent},
  {path:"contact", component: ContactComponent},
  {path:"links", component: LinksComponent},
  {path:"sheriff-sale", component: SheriffSaleComponent},
  {path:"income", component: IncomeComponent},
  {path:"income-table", component: IncomeTableComponent},
  {path: 'callback', component: OktaCallbackComponent},

  {path: 'page-not-found', component: PageNotFoundComponent},


  { path: '**', redirectTo:'page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
