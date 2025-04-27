import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if user is already logged in (from localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    // TODO: Replace with actual API call
    // For now, we'll simulate a successful login
    if (username && password) {
      localStorage.setItem('authToken', 'dummy-token');
      this.isAuthenticatedSubject.next(true);
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }
    return new Observable(observer => {
      observer.next(false);
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
} 