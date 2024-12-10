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
      @apply h-full flex;
    }
  `]
})
export class ArticleComponent {
  products: Product[] = [];
  suppliers: Supplier[] = [];
  newProduct: Product = {};
  newSupplier: Supplier = {};
  productDialog: boolean = false;
  supplierDialog: boolean = false;
  loading: boolean = true;

  constructor(private productService: GidLogisticsService) {}

  ngOnInit() {
    // Produkte von der API laden
    this.loadTableData();

  }

  loadTableData() {
        // Produkte von der API laden
        this.productService.apiGidLogisticsProductsGet().subscribe((data: Message) => {
          console.log(data);
          this.products = data.body;
          this.loading = false;
        });
    
        this.productService.apiGidLogisticsSupplierGet().subscribe((data: Message) => {
          console.log(data);
          this.suppliers = data.body;
          this.loading = false;
        });
  }

  // Dialog öffnen
  openNewProductDialog() {
    this.newSupplier = {
      id: undefined,
      name: undefined,
      address: {
        street: undefined,
        houseNumber: undefined,
        postcode: undefined,
        region: undefined
      }
    };
    this.newProduct = {};
    console.log(this.newProduct.supplier);
    this.productDialog = true;
  }

  // Neuen Lieferanten-Dialog öffnen
  openNewSupplierDialog() {

    this.supplierDialog = true;
  }

  // Dialog schließen
  hideDialog() {
    this.productDialog = false;
    this.supplierDialog = false;
  }

  // Neues Produkt speichern
  saveProduct() {
    if (this.newSupplier.name && this.newSupplier.address && this.newSupplier.address.street && this.newSupplier.address.houseNumber && this.newSupplier.address.postcode && this.newSupplier.address.region) {
      this.newProduct.supplier = this.newSupplier;
    }
    if (
      this.newProduct.productName &&
      this.newProduct.productDescription &&
      this.newProduct.inventory &&
      this.newProduct.price &&
      this.newProduct.supplier
    ) {
      console.log(this.newProduct);
      this.productService.apiGidLogisticsCreateProductPost(this.newProduct).subscribe(
        (data: Message) => {
          this.loadTableData();
          console.log(data);
        },
        (error) => {
          console.error('Fehler aufgetreten:', error);
        }
      );
      this.productDialog = false;
    } else {
      alert('Bitte füllen Sie alle Felder aus.');
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