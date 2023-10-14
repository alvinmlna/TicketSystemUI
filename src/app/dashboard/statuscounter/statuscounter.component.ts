import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-statuscounter',
  templateUrl: './statuscounter.component.html',
  styleUrls: ['./statuscounter.component.scss']
})
export class StatuscounterComponent implements OnInit {
  new! : number;
  open! : number;
  closed! : number;
  total! : number;

  constructor(private dashboardService : DashboardService){}

  ngOnInit(): void {
    this.dashboardService.getStatusSummary().subscribe({
      next : res => {
        this.new = res[0].count;
        this.open = res[1].count;
        this.closed = res[3].count;
        this.total = res[4].count;
      }
    });
  }
}
