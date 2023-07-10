import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Login } from './login.model';
import { Persona } from '../inserimento Persona/persona.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login/loginP';
  isAdmin = false;
  private currentUserKey = 'currentUser';
  

  constructor(private http: HttpClient) {}

  getCurrentUser(): Persona {
    const persona = sessionStorage.getItem(this.currentUserKey);
    return persona ? JSON.parse(persona):Persona;
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
    return this.http.post(this.loginUrl, login);
  }
    // Metodi per impostare e ottenere lo stato dell'amministratore
    setAdminStatus(status: boolean): void {
      this.isAdmin = status;
    }
  
    getAdminStatus(): boolean {
      return this.isAdmin;
    }
}
