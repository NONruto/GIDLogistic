import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, PaginatorModule, TableModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  styles: [`
    :host {
      @apply h-full block;
    }
  `]
})
export class ArticleComponent {
  items = [
    {
      name: 'Item 1',
      description: 'This is a description of item 1.',
      image: 'https://via.placeholder.com/150',
      stock: 10
    },
    {
      name: 'Item 2',
      description: 'This is a description of item 2.',
      image: 'https://via.placeholder.com/150',
      stock: 5
    },
    // Weitere Artikel
  ];

  inventoryData = [
    {
      name: 'Artikel 1',
      description: 'Beschreibung von Artikel 1',
      stock: 120,
      price: 19.99
    },
    {
      name: 'Artikel 2',
      description: 'Beschreibung von Artikel 2',
      stock: 60,
      price: 45.50
    },
    // Weitere Artikel
  ];

  totalRecords = this.items.length;
}
