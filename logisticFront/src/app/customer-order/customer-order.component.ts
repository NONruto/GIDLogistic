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

  placeOrder(): void {
    if (!this.selectedCustomer) return;

    const order:Order = {
      id: 0,
      products: this.selectedProducts,
      name: 'Bestellung von ' + this.selectedCustomer.customerName + " "  + new Date().toLocaleString(),
      customer: this.selectedCustomer,
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