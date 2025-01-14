import { Component, OnInit } from '@angular/core';
import { Customer, GidLogisticsService, Message } from '../../../swagger';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.component.css'],
  providers: [GidLogisticsService],
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    InputIconModule,
    IconFieldModule,
    FormsModule,
    CommonModule,
  ],
  styles: [`
    :host {
      @apply h-full flex;
    }
  `]
})
export class CustomerOverviewComponent implements OnInit {
  customers: Customer[] = [];
  loading: boolean = false;
  customerDialog: boolean = false;

  newCustomer: Customer = {
    id: 0, // Beispiel-ID, anpassen nach Modell
    customerName: '',
    address: {
      id: 0,
      street: '',
      houseNumber: 0,
      postcode: 0,
      region: '',
    },
  };

  constructor(private logisticsService: GidLogisticsService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  /**
   * Lädt die Kunden von der API
   */
  loadCustomers(): void {
    this.loading = true;

    this.logisticsService.apiGidLogisticsCustomerGet().subscribe((data: Message) => {
      console.log(data);
      this.customers = data.body;
      this.loading = false;
    });
  }

  /**
   * Öffnet den Dialog zum Hinzufügen eines neuen Kunden
   */
  openNewCustomerDialog(): void {
    this.newCustomer = {
      id: 0,
      customerName: '',
      address: {
        id: 0,
        street: '',
        houseNumber: 0,
        postcode: 0,
        region: '',
      },
    };
    this.customerDialog = true;
  }

  /**
   * Schließt den Dialog
   */
  hideCustomerDialog(): void {
    this.customerDialog = false;
  }

  /**
   * Speichert einen neuen Kunden
   */
  async saveCustomer() {
    if (!this.newCustomer.customerName || !this.newCustomer.address?.street) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    // Beispielhafter API-Aufruf, anpassen nach Bedarf
    await this.logisticsService.apiGidLogisticsCreateCustomerPost(this.newCustomer).subscribe({
      next: (response) => {
        this.customers.push({
          ...response,
          address: {
            street: response.address?.street,
            houseNumber: response.address?.houseNumber,
            postcode: response.address?.postcode,
            region: response.address?.region,
          },
        });
        this.customerDialog = false;
      },
      error: (err) => {
        console.error('Fehler beim Speichern des Kunden:', err);
      },
    });
  }
}
