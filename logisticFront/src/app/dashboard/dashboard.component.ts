import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  styles: [`
    :host {
      @apply h-full block;
    }
  `]
})
export class DashboardComponent {
  salesData: any;
  productData: any;
  chartOptions: any;
  salesTableData: any[];

  constructor() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#baff29', // Neon Lime für die Legende
          },
        },
        tooltip: {
          backgroundColor: '#28293d', // Hintergrundfarbe der Tooltips
          titleColor: '#baff29', // Titel in Neon Lime
          bodyColor: '#ffffff', // Textfarbe in Tooltips
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#baff29', // Neon Lime für X-Achsen-Ticks
          },
          grid: {
            color: '#3a3b4c', // Dunklerer Farbton für das Gitter der X-Achse
          },
        },
        y: {
          ticks: {
            color: '#baff29', // Neon Lime für Y-Achsen-Ticks
          },
          grid: {
            color: '#3a3b4c', // Dunklerer Farbton für das Gitter der Y-Achse
          },
        },
      },
    };

    // Fake-Daten für Sales by Region (Bar Chart)
    this.salesData = {
      labels: ['North', 'South', 'East', 'West'],
      datasets: [
        {
          label: 'Sales',
          data: [2500, 1700, 3200, 1200],
          backgroundColor: ['#9b5de5', '#66bb6a', '#baff29', '#ff6384'], // Farben für die Balken
          borderColor: '#baff29', // Neon Lime für den Rand der Balken
          borderWidth: 2, // Randbreite für die Balken
        },
      ],
    };

    // Fake-Daten für Top Products (Doughnut Chart)
    this.productData = {
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      datasets: [
        {
          label: 'Products',
          data: [500, 300, 200, 150, 100],
          backgroundColor: ['#9b5de5', '#66bb6a', '#baff29', '#ff6384', '#ab47bc'], // Farben für die Donuts
          borderColor: '#baff29', // Neon Lime für den Rand der Donuts
          borderWidth: 2, // Randbreite für die Donuts
        },
      ],
    };

    // Fake-Daten für Sales-Tabelle
    this.salesTableData = [
      { product: 'Product A', units: 500, region: 'North', revenue: 5000 },
      { product: 'Product B', units: 300, region: 'South', revenue: 3000 },
      { product: 'Product C', units: 200, region: 'East', revenue: 2000 },
      { product: 'Product D', units: 150, region: 'West', revenue: 1500 },
      { product: 'Product E', units: 100, region: 'North', revenue: 1000 },
    ];
  }
}
