import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This ensures the service is available app-wide
})
export class AuthService {
  private loginUrl = 'https://localhost:7021/api/AccountController/Login';  // Your backend URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password, RememberMe:true };

    return this.http.post(this.loginUrl, body, { headers });
  }
}
