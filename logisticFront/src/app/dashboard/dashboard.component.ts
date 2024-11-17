import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { Customer, Product, Supplier } from '../../../swagger';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, DividerModule, TableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  styles: [`
    :host {
      @apply h-full block;
    }
    h1 {
    color: #333;
    }
  `]
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  products: Product[] = [];
  suppliers: Supplier[] = [];
  currency: string = '€';

  ngOnInit(): void {
    // Beispiel-Daten (später durch API-Aufrufe ersetzt)
    this.customers = [
      { customerId: 1, customerName: 'Max Mustermann', address: { street: 'Musterstraße', houseNumber: 1, postcode: 12345, region: 'Nord' } }
    ];

    this.products = [
      { productNumber: 101, productName: 'Produkt A', inventory: 50, price: 19.99, productDescription: 'Beschreibung A' }
    ];

    this.suppliers = [
      { id: 1, name: 'Lieferant X', address: { street: 'Lieferantenstraße', houseNumber: 10, postcode: 54321, region: 'Süd' } }
    ];
  }
}
