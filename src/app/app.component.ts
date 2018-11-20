import { Component } from '@angular/core';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(ngx: NgxAnalyticsGoogleAnalytics) {}
}
