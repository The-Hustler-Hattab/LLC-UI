import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ContactComponent } from './components/contact/contact.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LinksComponent } from './components/links/links.component';
import { SheriffSaleComponent } from './components/sheriff-sale/sheriff-sale.component';
import { IncomeComponent } from './components/income/income-form/income.component';
import { IncomeTableComponent } from './components/income/income-table/income-table.component';
import { PlaidComponent } from './components/plaid-banks/plaid/plaid.component';
import { ManageBankComponent } from './components/plaid-banks/manage-bank/manage-bank.component';
import { AuthGuard } from './guard/auth.guard';
import { ContractorsFormComponent } from './components/contractors/contractors-form/contractors-form.component';
import { ReceiptFilesComponent } from './components/reciepts/receipt-files/receipt-files.component';
import { RecieptsTableComponent } from './components/reciepts/reciepts-table/reciepts-table.component';
import { RecieptsUploadComponent } from './components/reciepts/reciepts-upload/reciepts-upload.component';
import { ContractorsTableComponent } from './components/contractors/contractors-table/contractors-table.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"",redirectTo: "home", pathMatch: 'full'},
  {path:"about", component: AboutComponent},
  {path:"reciepts", component: ReceiptFilesComponent, canActivate: [AuthGuard]},
  {path:"reciepts-table", component: RecieptsTableComponent,canActivate: [AuthGuard]},
  {path:"reciepts-upload", component: RecieptsUploadComponent,canActivate: [AuthGuard]},
  {path:"analytics", component: AnalyticsComponent,canActivate: [AuthGuard]},
  {path:"contact", component: ContactComponent},
  {path:"links", component: LinksComponent,canActivate: [AuthGuard]},
  {path:"sheriff-sale", component: SheriffSaleComponent,canActivate: [AuthGuard]},
  {path:"income", component: IncomeComponent,canActivate: [AuthGuard]},
  {path:"income-table", component: IncomeTableComponent,canActivate: [AuthGuard]},
  {path:"contractor-form", component: ContractorsFormComponent,
    canActivate: [AuthGuard]
  },
  {path:"contractor-table", component: ContractorsTableComponent,
    // canActivate: [AuthGuard]
  },

  
  {path:"plaid", component: PlaidComponent,canActivate: [AuthGuard]},
  {path:"manage-bank", component: ManageBankComponent,canActivate: [AuthGuard]},


  {path: 'callback', component: OktaCallbackComponent},

  {path: 'page-not-found', component: PageNotFoundComponent},


  { path: '**', redirectTo:'page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
