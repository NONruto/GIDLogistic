import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { AccountService } from '../../../swagger';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService],
  standalone: true,
  imports: [FormsModule, HttpClientModule] // Ensure HttpClientModule is in imports
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private acoountService: AccountService) {}

  onLogin(): void {
    this.acoountService.apiAccountLoginGet({ username: this.username, password: this.password })
      .subscribe(
        (response) => {
          console.log("statusCode", response.status)
          console.log("Login successful:", response);
        },
        (error) => {
          console.error("Login failed:", error);
        }
      );
  }
}
