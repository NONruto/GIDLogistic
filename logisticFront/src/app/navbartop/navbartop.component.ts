import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchResultDto } from '../../../swagger/model/models';
import { FormsModule } from '@angular/forms';
import { GidLogisticsService } from '../../../swagger';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbartop',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, 
    CommonModule, FormsModule, HttpClientModule],
  providers: [GidLogisticsService],
  templateUrl: './navbartop.component.html',
  styleUrl: './navbartop.component.css'
})
export class NavbartopComponent {
  constructor(private router: Router, private gidLogisticService: GidLogisticsService) {}

  searchTerm: string = '';
  searchResults: SearchResultDto[] = [];

  public isNotRootOrLogin(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '' && currentUrl !== '/' && currentUrl !== '/login';
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.gidLogisticService.apiGidLogisticsGlobalSearchGet(this.searchTerm).subscribe(results => {
            this.searchResults = results;
        });
    } else {
      this.searchResults = [];
    }
  }
}


