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
/**
 * Initiates a global search using the search term and updates the search results.
 * 
 * If the `searchTerm` is not empty or only whitespace, it triggers a call to the 
 * `gidLogisticService` to fetch the search results. The results are stored in 
 * the `searchResults` variable and logged to the console.
 * 
 * If the `searchTerm` is empty or only whitespace, the `searchResults` is cleared.
 */
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.gidLogisticService.apiGidLogisticsGlobalSearchGet(this.searchTerm).subscribe(results => {
            this.searchResults = results;
            console.log("global search results: ", results);
        });
    } else {
      this.searchResults = [];
    }
  }
}


