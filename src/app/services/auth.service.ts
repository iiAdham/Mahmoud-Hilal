import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  api = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7AzYCsJODcYyhFQ5Roi19cOIGr7BihJk";
  firestoreUrl = 'https://firestore.googleapis.com/v1/projects/mahmoud-hilal/databases/(default)/documents/users';

  isLogged = false;
  errorMessage = "";

  constructor(private http: HttpClient, private router: Router) { }

  // Login method with Firebase and then fetch role from Firestore
  login(user_email: string, user_password: string) {
    const data = { email: user_email, password: user_password, returnSecureToken: true };
    this.isLogged = true;

    return this.http.post<AuthResponse>(this.api, data).pipe(
      tap((res) => {
        this.fetchUserRole(res.localId).subscribe((role) => {
          this.handleCreateUser(res, role);
        });
      }),
      catchError((error) => this.handleError(error)) // Error handling added
    );
  }

  // Fetch user role from Firestore by UID
  private fetchUserRole(userId: string) {
    const url = `${this.firestoreUrl}/${userId}`;
    return this.http.get<any>(url).pipe(
      map((res) => res.fields.role.stringValue), // Extract role from Firestore response
      catchError((error) => this.handleError(error)) // Handle Firestore errors
    );
  }

  // Create User and store it in BehaviorSubject and localStorage
  private handleCreateUser(res: AuthResponse, role: string) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);

    const user = new User(res.email, res.localId, res.idToken, expiresIn, role);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Logout user and clear storage
  logOut() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/home']); // Redirect after logout
  }

  // Automatically log in user from localStorage if token is valid
  autoLogin() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!storedUser.email) return;

    const loadedUser = new User(
      storedUser.email,
      storedUser.id,
      storedUser._token,
      new Date(storedUser._expiresIn),
      storedUser.role
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  // Check if user is authenticated and redirect if not
  isAuthenticated() {
    return this.user.pipe(
      map((user) => {
        if (user) return true;
        this.router.navigateByUrl("/home"); // Redirect if not logged in
        return false;
      })
    );
  }

  // Error handler for HTTP requests
  private handleError(error: any) {
    let errorMsg = 'An unknown error occurred!';
    if (error.error && error.error.error) {
      errorMsg = error.error.error.message;
    }
    this.errorMessage = errorMsg;
    return throwError(() => new Error(errorMsg));
  }
}
