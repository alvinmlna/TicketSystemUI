import { Component, OnInit } from '@angular/core';
import { LayoutServiceService } from '../core/services/layout-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private layoutService: LayoutServiceService) {}

  ngOnInit(): void {
    this.layoutService.loadPageTitle("Dashboard");
  }
}
