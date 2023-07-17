import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./login/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const currentUser = this.authService.getCurrentUser();
      console.log(currentUser)
      if (currentUser) {
        return true;
      }
    }
    console.log("non sei loggato, reindirizzamento alla pagina di login");
    this.router.navigate(['/login']);
    return false;
  }
}
