import { Component, OnInit } from '@angular/core';
import { Order, Product, GidLogisticsService, Message } from '../../../swagger';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [GidLogisticsService],
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, CommonModule],
  styles: [`
    :host {
      @apply h-full flex flex-col;
    }
  `],
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  orderDialog: boolean = false;

  constructor(private logisticsService: GidLogisticsService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.logisticsService.apiGidLogisticsOrdersGet().subscribe((data: Message) => {
      this.orders = data.body || [];
    });
  }

  viewOrderDetails(order: Order): void {
    this.selectedOrder = order;
    this.orderDialog = true;
  }

  hideOrderDialog(): void {
    this.orderDialog = false;
    this.selectedOrder = null;
  }
}
