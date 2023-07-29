import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../model/login.model';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl = 'http://localhost:8080/login';
  isAdmin = false;
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Persona {
    const persona = sessionStorage.getItem(this.currentUserKey);
    return persona ? JSON.parse(persona) : null;
  }

  setCurrentUser(persona: Persona) {
    sessionStorage.setItem(this.currentUserKey, JSON.stringify(persona));
    localStorage.setItem(this.currentUserKey, JSON.stringify(persona));
  }

  removeCurrentUser() {
    sessionStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.currentUserKey);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  login(login: Login): Observable<any> {
    const url = `${this.backendUrl}/loginP`;
    return this.http.post<Login>(url, login);
  }
  postRecupero(codiceFiscale: string) {
    const url = `${this.backendUrl}/passD?codiceFiscale=${codiceFiscale}`;
    return this.http.post(url, {});
  }
}
