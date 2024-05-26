import { Component } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent {
  links = [
    { name: 'API Swagger UI - API Docs', url: 'https://receipt-app-tvan66p23a-uc.a.run.app/apidocs', image: 'assets/swagger-ui.png' },
    { name: 'Google Drive - Company Files', url: 'https://drive.google.com/drive/folders/1GXvEaDj84HY8cubN1PHhcxPD3fehbcgv', image: 'assets/google-drive.png' },
    { name: 'Home Shield - Home Warranty', url: 'https://myaccount.ahs.com/hb/maintenance-calendar', image: 'assets/home_sheild.png' },
    { name: 'KeyHero - House Keys', url: 'https://www.mykeyhero.com/my-keys/', image: 'assets/KeyHero.png' },
    { name: 'Baselane - Landlord Mangment', url: 'https://app.baselane.com/', image: 'assets/baselane.webp' },
    { name: 'Bill - Credit', url: 'https://app.divvy.co/companies/Q29tcGFueToxMzM0NzM=/home/dashboard', image: 'assets/bill.png' },

  ];

  constructor() { }

  ngOnInit(): void {
  }
}
