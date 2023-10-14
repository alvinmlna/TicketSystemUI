import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorychart',
  templateUrl: './categorychart.component.html',
  styleUrls: ['./categorychart.component.scss']
})
export class CategorychartComponent implements OnInit {
  data: any;
  options: any;
  
  
  ngOnInit(): void {    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                label: 'Numbers of tickets',
                data: [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
        ]
    };

    this.options = {
        plugins: {
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    color: textColor,
                }
            },
              title: {
                display: true,
                text: 'Category',
                fontSize: 16
            }
        }
    };
  }
}
