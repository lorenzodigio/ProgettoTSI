import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/login.service';
import { Login } from '../model/login.model';
import { Persona } from '../model/persona.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: Login = new Login();
  isAdmin = false;
  isLoggedIn = false;
  rememberMe = false;
  savedUsername = '';
  savedPassword = '';
  hide : boolean = true;

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    // Recupera i valori salvati dall'utente (se presenti) quando il componente viene caricato
    const rememberMeUsername = localStorage.getItem('rememberMeUsername');
    const rememberMePassword = localStorage.getItem('rememberMePassword');
    if (rememberMeUsername && rememberMePassword) {
      this.rememberMe = true;
      this.savedUsername = rememberMeUsername;
      this.savedPassword = rememberMePassword;
      this.login.codiceFiscale = this.savedUsername;
      this.login.password = this.savedPassword;
    }
  }

 submitLogin(): void {
    if (this.rememberMe) {
      // Memorizza l'username e la password
      localStorage.setItem('rememberMeUsername', this.login.codiceFiscale);
      localStorage.setItem('rememberMePassword', this.login.password);
    } else {
      // Rimuovi l'username e la password memorizzati
      localStorage.removeItem('rememberMeUsername');
      localStorage.removeItem('rememberMePassword');
    }

    this.authService.login(this.login).subscribe({
      next: (authenticatedUser: Persona) => {
        if (authenticatedUser.ruolo === 1) {
          this.authService.setCurrentUser(authenticatedUser);
          localStorage.setItem('isAdmin', 'true');
          sessionStorage.setItem('isAdmin', 'true');
          this.toastr.success("Sei Un Amministratore.")
          this.router.navigate(['admin/home']);
          this.isAdmin = true;
        } else {
          this.authService.setCurrentUser(authenticatedUser);
          this.toastr.success("Sei un Utente.")
          localStorage.setItem('isAdmin', 'false');
          sessionStorage.setItem('isAdmin', 'false');
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        let errorMessage = 'Login non riuscito';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.toastr.error(errorMessage);
        this.router.navigate(['/login']);
      },
    });
  }
}
export class FormFieldPrefixSuffix {
  hide = false;
}
