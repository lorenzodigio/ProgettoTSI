import { Component } from '@angular/core';
import { AuthService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUtentiClicked: boolean = false;
  isAdmin : boolean = false;
  username : string = '';
  surname : string = '';

  constructor(
    private authService: AuthService,
    private router: Router,

  ) {}
 
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedUsername = localStorage.getItem('currentUser');
  
    if (storedUsername) {
      const currentUser = JSON.parse(storedUsername);
      this.username = currentUser.nome;
      this.surname = currentUser.cognome;
    } else {
      this.username = 'Nome utente non disponibile';
    }
  }

  logout(): void {
    this.authService.removeCurrentUser();
    localStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isAdmin');
    this.router.navigate(['/login']);
    console.log('Sono sloggato');
  }
}
