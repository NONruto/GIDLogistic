import { Component, OnInit } from '@angular/core';
import { ColumnFilter, Table } from 'primeng/table';

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GidLogisticsService, Product, Supplier, Message } from '../../../swagger';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article',
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
  providers: [GidLogisticsService],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  styles: [`
    :host {
      @apply h-full block;
    }
  `]
})
export class ArticleComponent {
  products: Product[] = [];
  suppliers: Supplier[] = [];
  newProduct: Product = {};
  productDialog: boolean = false;
  loading: boolean = true;

  constructor(private productService: GidLogisticsService) {}

  ngOnInit() {
      // Produkte von der API laden
      this.productService.apiGidLogisticsProductsGet().subscribe((data: Message) => {
        console.log(data);
          this.products = data.body;
          this.loading = false;
      });

      // Beispielhafte Lieferanten (Dummy-Daten)
      this.suppliers = [
          { id: 1, name: 'Supplier A', address: { street: 'Street 1', houseNumber: 1, postcode: 12345, region: 'Region A' } },
          { id: 2, name: 'Supplier B', address: { street: 'Street 2', houseNumber: 2, postcode: 67890, region: 'Region B' } }
      ];
  }

  // Dialog öffnen
  openNewProductDialog() {
      this.newProduct = {};
      this.productDialog = true;
  }

  // Dialog schließen
  hideDialog() {
      this.productDialog = false;
  }

  // Neues Produkt speichern
  saveProduct() {
      if (this.newProduct.productName && this.newProduct.price) {
          this.products.push({ ...this.newProduct });
          this.productDialog = false;
      }
  }

  // Filter zurücksetzen
  clear(table: Table) {
      table.clear();
  }

  // Schweregrad basierend auf dem Produktbestand
  getSeverity(inventory: number) {
      if (inventory > 50) {
          return 'success';
      } else if (inventory > 20) {
          return 'warning';
      } else {
          return 'danger';
      }
  }
}