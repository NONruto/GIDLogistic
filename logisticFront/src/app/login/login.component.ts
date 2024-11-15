import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { AuthService } from '../services/auth.service'; // Import your AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService], // Ensure AuthService is provided
  standalone: true,
  imports: [FormsModule, HttpClientModule] // Ensure HttpClientModule is in imports
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          console.log("Login successful:", response);
        },
        (error) => {
          console.error("Login failed:", error);
        }
      );
  }
}
