import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer-overview',
  standalone: true,
  imports: [CommonModule,BrowserModule, FormsModule],
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.css'
})
export class CustomerOverviewComponent {
  isEditMode = false;

  customerData = {
    name: 'Max Mustermann',
    email: 'max@example.com',
    phone: '01234-567890',
    address: 'Musterstraße 1, 12345 Musterstadt'
  };

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    // Speichern der Änderungen
    this.isEditMode = false;
    // Optional: Hier Code einfügen, um Änderungen in einer Datenbank zu speichern
  }

  cancelEdit() {
    // Abbrechen und zurück zur Anzeige-Ansicht
    this.isEditMode = false;
    // Optional: Hier Änderungen verwerfen
  }
}
