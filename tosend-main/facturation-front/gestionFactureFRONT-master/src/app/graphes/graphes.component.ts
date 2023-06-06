import { Component, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartOptions, ChartDataSets, ChartType } from 'chart.js';

@Component({
  selector: 'app-graphes',
  templateUrl: './graphes.component.html',
  styleUrls: ['./graphes.component.scss']
})
export class GraphesComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChartCanvas', { static: true })
  lineChartCanvas!: ElementRef;

  private lineChart!: Chart;
  lineChartLabels!: any[];
  lineChartData!: ChartDataSets[];
  chart1: any;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFactureData();
  }
  ngAfterViewInit(): void {
    this.createLineChart();
    this.createBarChart();

  }


  fetchFactureData(): void {
    this.http.get<any[]>('http://localhost:8060/api/test/facture/user-convention')
      .subscribe(factures => {
        const lineChartLabels = factures.map(facture => facture.dueDatefct);
        const lineChartData = [{
          data: factures.map(facture => facture.amount),
          label: 'Facture Amount',
          borderColor: 'blue',
          fill: false
        }];

        this.lineChartLabels = lineChartLabels;
        this.lineChartData = lineChartData;

        if (this.lineChart) {
          this.updateLineChart();
        }
      });
  }

  createLineChart(): void {
    this.lineChart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true
      }
    });
  }

  updateLineChart(): void {
    this.lineChart.data.labels = this.lineChartLabels;
    this.lineChart.data.datasets = this.lineChartData;
    this.lineChart.update();
  }

  createBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context is not available.');
      return;
    }

    this.chart1 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'Data',
            data: [10, 20, 30, 40, 50],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

//function ViewChild(arg0: string, arg1: { static: boolean; }): (target: GraphesComponent, propertyKey: "lineChartCanvas") => void {
  //throw new Error('Function not implemented.');
//}
}
