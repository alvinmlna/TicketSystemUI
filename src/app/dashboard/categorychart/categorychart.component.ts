import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-categorychart',
  templateUrl: './categorychart.component.html',
  styleUrls: ['./categorychart.component.scss']
})
export class CategorychartComponent implements OnInit {
  data: any;


  chartData: any;
  chartOptions: any;

  product: any;
  productOptions: any;
  category: any;
  categoryOptions: any;
  priority: any;
  priorityOptions: any;

  documentStyle : any;
  textColor : any;

  chartType!: any[];
  selectedChart : any;
  
  
  constructor (private dashboardService : DashboardService){}
  
  ngOnInit(): void {    
    this.documentStyle = getComputedStyle(document.documentElement);
    this.textColor = this.documentStyle.getPropertyValue('--text-color');

    this.chartType = [
      { name: 'Product', code: 'product' },
      { name: 'Category', code: 'category' },
      { name: 'Priority', code: 'priority' },
  ];
    this.setProductChart();
    this.chartOptions = {
        plugins: {
            legend: {
                position: "bottom",
                display: true,
                labels: {
                    usePointStyle: true,
                    color: this.textColor,
                }
            }
        }
    };
  }

  changeChart(){
    switch(this.selectedChart.code){
      case "product": {
        this.setProductChart();
        break;
      }
      case "category": {
        this.setCategoryChart();
        break;
      }
      case "priority":{
        this.setPriorityChart();
        break;
      }
      default: {
        break;
      }

    }
  }

  setProductChart(){
    this.dashboardService.getByCategory('product').subscribe({
      next : res => {
        this.chartData = {
          labels: res.category,
          datasets: [
              {
                  data: res.count,
                  backgroundColor: [
                    this.documentStyle.getPropertyValue('--tosca'), 
                    this.documentStyle.getPropertyValue('--green'),
                    this.documentStyle.getPropertyValue('--yellow')  
                  ]
              }
          ]
        };
      }
    })
  }
  
  setCategoryChart(){
    this.dashboardService.getByCategory('category').subscribe({
      next : res => {
        this.chartData = {
          labels: res.category,
          datasets: [
              {
                  data: res.count,
                  backgroundColor: [this.documentStyle.getPropertyValue('--blue-500'), this.documentStyle.getPropertyValue('--yellow-500'), this.documentStyle.getPropertyValue('--green-500')],
                  hoverBackgroundColor: [this.documentStyle.getPropertyValue('--blue-400'), this.documentStyle.getPropertyValue('--yellow-400'), this.documentStyle.getPropertyValue('--green-400')]
              }
          ]
        };
      }
    })
  }

  setPriorityChart(){
    this.dashboardService.getByCategory('priority').subscribe({
      next : res => {
        this.chartData = {
          labels: res.category,
          datasets: [
              {
                  data: res.count,
                  backgroundColor: [
                    this.documentStyle.getPropertyValue('--red'), 
                    this.documentStyle.getPropertyValue('--green'), 
                    this.documentStyle.getPropertyValue('--yellow'), 
                    this.documentStyle.getPropertyValue('--orange'), 
                    this.documentStyle.getPropertyValue('--blue')]
              }
          ]
        };
      }
    })
  }
}
