import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-numberofticketchart',
  templateUrl: './numberofticketchart.component.html',
  styleUrls: ['./numberofticketchart.component.scss']
})
export class NumberofticketchartComponent implements OnInit {
  basicData: any;
  basicOptions: any;

  constructor (private dashboardService : DashboardService) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dashboardService.getLast12MonthChart().subscribe({
      next: res => {
        this.basicData = {
          labels: res.monthName,
          datasets: [
              {
                  label: 'Numbers of tickets',
                  data: res.count,
                  fill: true,
                  tension: 0.4,
                  borderColor: ['rgba(0, 125, 136, 1)'],
                  borderWidth: 1,
                 backgroundColor: 'rgba(0, 125, 136,0.2)'
              }
          ]
      };
      }
    })



    this.basicOptions = {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }
}
