import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number | string;
  Role: { name: string };
  companyId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Attempt to load user if token exists on startup
    if (this.getToken()) {
      this.fetchMe().subscribe({
        error: () => this.logout() // invalid token
      });
    }
  }

  public get currentUserValue(): User | null {
    return this.userSubject.value;
  }

  public getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, credentials).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('adminToken', res.token);
          this.userSubject.next(res.user);
        }
      })
    );
  }

  fetchMe(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/me`).pipe(
      tap(res => {
        if (res.user) {
          this.userSubject.next(res.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    this.userSubject.next(null);
  }

  hasRole(roleName: string): boolean {
    const user = this.currentUserValue;
    return user?.Role?.name === roleName;
  }
}
