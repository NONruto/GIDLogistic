import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { Customer, GidLogisticsService, Message, Product, Supplier } from '../../../swagger';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, 
    DividerModule, 
    TableModule, 
    CommonModule,
    HttpClientModule],
  providers: [GidLogisticsService],
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

  constructor(private productService: GidLogisticsService) { 

  }
/**
 * Initializes the component by setting up initial data and making API calls 
 * to fetch customer, product, and supplier information.
 * 
 * Initially, mock data is provided for `customers`, `products`, and `suppliers`, 
 * which will later be replaced by actual data fetched from API calls:
 * - `customers` contains a list of customer objects with basic address information.
 * - `products` includes a list of products with inventory, price, and description.
 * - `suppliers` lists supplier details, including address.
 * 
 * API calls are made to fetch real data for:
 * - Products from the `apiGidLogisticsProductsGet` endpoint.
 * - Suppliers from the `apiGidLogisticsSupplierGet` endpoint.
 * - Customers from the `apiGidLogisticsCustomerGet` endpoint.
 * 
 * The results of the API calls are logged to the console and used to update 
 * the component's state.
 */
  ngOnInit(): void {
    // Beispiel-Daten (später durch API-Aufrufe ersetzt)
    this.customers = [
      { id: 1, customerName: 'Max Mustermann', address: { street: 'Musterstraße', houseNumber: 1, postcode: 12345, region: 'Nord' } }
    ];

    this.products = [
      { id: 101, productName: 'Produkt A', inventory: 50, price: 19.99, productDescription: 'Beschreibung A' }
    ];

    this.suppliers = [
      { id: 1, name: 'Lieferant X', address: { street: 'Lieferantenstraße', houseNumber: 10, postcode: 54321, region: 'Süd' } }
    ];

    this.productService.apiGidLogisticsProductsGet().subscribe((data: Message) => {
      console.log(data);
      this.products = data.body;
    });

    this.productService.apiGidLogisticsSupplierGet().subscribe((data: Message) => {
      console.log(data);
      this.suppliers = data.body;
    });

    this.productService.apiGidLogisticsCustomerGet().subscribe((data: Message) => {
      console.log(data);
      this.customers = data.body;
    });
    
  }
}
