import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbartop',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbartop.component.html',
  styleUrl: './navbartop.component.css'
})
export class NavbartopComponent {

}
