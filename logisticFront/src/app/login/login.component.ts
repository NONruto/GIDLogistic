import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { AccountService } from '../../../swagger';
import { Router } from '@angular/router';


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

  constructor(private acoountService: AccountService, private router:Router) {}

  onLogin(): void {
    this.acoountService.apiAccountLoginGet(this.username, this.password)
      .subscribe(
        (response) => {
          var status = response.status;
          if (status == 200) {
            console.log("Login successful. Redirecting...");
            this.router.navigate(['/dashboard']);
          }
          console.log("Debug:", response);
        },
        (error) => {
          console.error("Login failed:", error);
        }
      );
  }
}
