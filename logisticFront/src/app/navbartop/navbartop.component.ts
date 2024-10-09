import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbartop',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbartop.component.html',
  styleUrl: './navbartop.component.css'
})
export class NavbartopComponent {
  constructor(private router: Router) {}

  public isNotRootOrLogin(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '' && currentUrl !== '/' && currentUrl !== '/login';
  }
}


