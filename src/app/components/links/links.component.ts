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
    { name: 'KeyHero - House Keys', url: 'https://www.mykeyhero.com/my-keys/', image: 'assets/KeyHero.png' },
    { name: 'Baselane - Landlord Mangment', url: 'https://app.baselane.com/', image: 'assets/baselane.webp' },
    { name: 'Bill - Credit', url: 'https://app.divvy.co/companies/Q29tcGFueToxMzM0NzM=/home/dashboard', image: 'assets/bill.png' },
    { name: 'Business One Stop Shop', url: 'https://hub.business.pa.gov/', image: 'assets/hub.business.pa.png' },

  ];

  section8Links = [
    { name: 'HACP - Portal', url: 'https://hacp.org/portal/', image: 'assets/HACP.webp' },
    { name: 'HACP - Tier Map', url: 'https://alcogis.maps.arcgis.com/apps/webappviewer/index.html?id=531501a0fc54461a8a5ff1ac31bada15', image: 'assets/HACP.webp' },
    { name: 'HACP - House Tiers', url: 'https://hacp.org/app/uploads/2022/09/Tiered-Payment-Standards-effective-10.1.22.pdf', image: 'assets/HACP.webp' },
    { name: 'Affordable Housing - Portal', url: 'https://www.affordablehousing.com/v4/pages/login/login.aspx?action=signin&username=&redirect=http%3a%2f%2fwww.affordablehousing.com%2fv4%2fpages%2fListing%2fListing.aspx', image: 'assets/affordableHousing.png' },


  ];

  AlleghanyCountyLinks = [
    { name: 'Real Estate Owner Search', url: 'https://www2.alleghenycounty.us/RealEstate/Search.aspx', image: 'assets/alleghany_county_tax.ico' },
    { name: 'Court Records', url: 'https://dcr.alleghenycounty.us/Civil/LoginSearch.aspx', image: 'assets/court_record.png' },
    { name: 'Property Records', url: 'https://pa_allegheny.uslandrecords.com/palr/', image: 'assets/AlleghenyLogo.jpg' },
    { name: 'Sheriff Sale', url: 'https://sheriffalleghenycounty.com/sheriffs-sales/', image: 'assets/sherif_sale_ico.png' },
  ];

  PropertySearch = [
    { name: 'Zillow', url: 'https://www.zillow.com/homes/', image: 'assets/zillow.svg' },
    { name: 'Realtor', url: 'https://www.realtor.com/', image: 'assets/realtor.svg' },
    { name: 'One Home', url: 'https://portal.onehome.com/en-US/properties/map?token=eyJPU04iOiJXRVNUUEVOTiIsImFnZW50aWQiOiIyMTAwMSIsInNldGlkIjogIjEwMjg3NTMiLCJzZXRUeXBlIjogIlBST1BFUlRZIiwic2F2ZWRTZWFyY2hJZCI6ICJmMjBkZjlhNC0yNGQ2LTM2MDItYTgyMS0yMDkwMGU2NWZmZmQiLCJlbWFpbCI6ICIiLCAiVmlld01vZGUiOiAiMyJ9&searchId=f20df9a4-24d6-3602-a821-20900e65fffd', image: 'assets/one_home.ico' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
