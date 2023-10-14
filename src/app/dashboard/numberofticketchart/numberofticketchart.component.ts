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
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                  borderWidth: 1
              }
          ]
      };
      }
    })



    this.basicOptions = {
        plugins: {
            legend: {
                display: false,
            },
            title: {
              display: true,
              text: 'Last 12 Month Tickets',
              fontSize: 16
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
