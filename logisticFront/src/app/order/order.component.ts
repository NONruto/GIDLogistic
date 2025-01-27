import { Component, OnInit } from '@angular/core';
import { Order, Product, GidLogisticsService, Message, TrackingService } from '../../../swagger';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Shipment,Event } from '../../../swagger/model/shipment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [GidLogisticsService, TrackingService],
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
  shipmentTracking: Event | null = null;
  expandedOrder: Order | null = null;
  loadingTracking: boolean = false;

  constructor(private logisticsService: GidLogisticsService, private trackingService: TrackingService) {}

  ngOnInit(): void {
    this.loadOrders();
  }


  toggleExpand(order: Order) {
    
    this.expandedOrder = this.expandedOrder === order ? null : order;
  }


  loadOrders(): void {
    this.logisticsService.apiGidLogisticsOrdersGet().subscribe((data: Message) => {
      this.orders = data.body || [];
    });
  }
/**
 * Displays the details of the selected order and retrieves tracking information
 * from an external service if available.
 * 
 * @param order The order object that contains the order details, including any
 *        additional information such as a tracking number.
 * 
 * This method:
 * - Sets the `selectedOrder` to the passed order object.
 * - Opens the order details dialog by setting `orderDialog` to true.
 * - Checks if additional tracking information is available in the order.
 * - If tracking information exists, it calls the `trackingService` to fetch tracking details.
 * - Displays loading state while fetching the tracking info and handles success/error responses.
 * - On success, it stores the tracking data in `shipmentTracking` and stops the loading state.
 * - On error, it logs the error and stops the loading state.
 */
  viewOrderDetails(order: Order) {
    this.selectedOrder = order;
    this.orderDialog = true;
    this.shipmentTracking = null;
  
    if (order.additionalInformatione) {
      this.loadingTracking = true;
      this.trackingService.apiTrackingTrackshippingNoGet(order.additionalInformatione).subscribe({
        next: (data) => {
          console.log('Tracking-Infos abgerufen', data);
          this.shipmentTracking = data;
          this.loadingTracking = false;
        },
        error: (error) => {
          console.error('Fehler beim Abrufen der Tracking-Infos', error);
          this.loadingTracking = false;
        },
      });
    }
  }

  hideOrderDialog(): void {
    this.orderDialog = false;
    this.selectedOrder = null;
  }
}
