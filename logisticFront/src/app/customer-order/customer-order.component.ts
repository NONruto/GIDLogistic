import { Component, OnInit } from '@angular/core';
import { Customer, Product, GidLogisticsService, Message, Order } from '../../../swagger';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css'],
  providers: [GidLogisticsService],
  standalone: true,
  imports: [DropdownModule, TableModule, ButtonModule, DialogModule, FormsModule, CommonModule],
  styles: [`
    :host {
      @apply h-full flex flex-col;
    }
  `],
})
export class CustomerOrderComponent implements OnInit {
  customers: Customer[] = [];
  products: Product[] = [];
  selectedProducts: Product[] = [];
  selectedCustomer: Customer | null = null;
  orderDialog: boolean = false;

  constructor(private logisticsService: GidLogisticsService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
  }

  loadCustomers(): void {
    this.logisticsService.apiGidLogisticsCustomerGet().subscribe((data: Message) => {
      this.customers = data.body;
    });
  }

  loadProducts(): void {
    this.logisticsService.apiGidLogisticsProductsGet().subscribe((data: Message) => {
      this.products = data.body;
    });
  }

  openOrderDialog(): void {
    if (!this.selectedCustomer) {
      alert('Bitte wählen Sie einen Kunden aus.');
      return;
    }

    if (this.selectedProducts.length === 0) {
      alert('Bitte wählen Sie mindestens ein Produkt aus.');
      return;
    }

    this.orderDialog = true;
  }

  hideOrderDialog(): void {
    this.orderDialog = false;
  }
/**
 * Places a new order for the selected customer with the currently selected products.
 * 
 * This method:
 * - Checks if a `selectedCustomer` is available.
 * - Creates a new order object with the `selectedProducts`, the customer's name, 
 *   and a unique order name based on the current date and time.
 * - Sends the order to the backend using the `apiGidLogisticsCreateOrderPost` API endpoint.
 * - If the order is successfully placed, an alert is shown to the user, the selected products are cleared, 
 *   and the order dialog is closed.
 * - If the order placement fails, an error message is logged to the console.
 * 
 * @returns {void} This method doesn't return any value.
 */
  placeOrder(): void {
    if (!this.selectedCustomer) return;

    const order:Order = {
      id: 0,
      products: this.selectedProducts,
      name: 'Bestellung von ' + this.selectedCustomer.customerName + " "  + new Date().toLocaleString(),
      customer: this.selectedCustomer,
      additionalInformatione: '00340434777752003817',
    };

    this.logisticsService.apiGidLogisticsCreateOrderPost(order).subscribe({
      next: () => {
        alert('Bestellung erfolgreich aufgegeben.');
        this.selectedProducts = [];
        this.orderDialog = false;
      },
      error: (err) => {
        console.error('Fehler bei der Bestellung:', err);
      },
    });
  }
}