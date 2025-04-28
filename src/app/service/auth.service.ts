import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  login(username: string, password: string): Observable<boolean> {
    const request: AuthenticationRequest = { username, password };
    
    return new Observable(observer => {
      this.http.post<AuthenticationResponse>(`${this.apiUrl}/api/auth/login`, request).subscribe({
        next: (response) => {
          if (response.success && response.token) {
            localStorage.setItem('authToken', response.token);
            this.isAuthenticatedSubject.next(true);
            observer.next(true);
          } else {
            observer.next(false);
=======
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
>>>>>>> 1b6bebca3cc7e4e151ce8794f4caf746a35943f2
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
} 