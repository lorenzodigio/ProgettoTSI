import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./login/login.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // L'utente non è autenticato, reindirizzalo alla pagina di login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
