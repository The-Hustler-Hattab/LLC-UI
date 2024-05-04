import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReceiptFilesComponent } from './components/receipt-files/receipt-files.component';
import { RecieptsUploadComponent } from './components/reciepts-upload/reciepts-upload.component';
import { RecieptsTableComponent } from './components/reciepts-table/reciepts-table.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"",redirectTo: "home", pathMatch: 'full'},
  {path:"about", component: AboutComponent},
  {path:"reciepts", component: ReceiptFilesComponent},
  {path:"reciepts-table", component: RecieptsTableComponent},
  {path:"reciepts-upload", component: RecieptsUploadComponent},


  {path: 'page-not-found', component: PageNotFoundComponent},


  { path: '**', redirectTo:'page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
