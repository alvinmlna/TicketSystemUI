import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numberofticketchart',
  templateUrl: './numberofticketchart.component.html',
  styleUrls: ['./numberofticketchart.component.scss']
})
export class NumberofticketchartComponent implements OnInit {
  basicData: any;
  basicOptions: any;

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.basicData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Numbers of tickets',
                data: [540, 325, 702, 620,223,560,840,123,223,560,840,123],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1
            }
        ]
    };

    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
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
