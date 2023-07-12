import { Component, OnInit } from '@angular/core';
import { Persona } from '../inserimento Persona/persona.model';
import { Vettura } from '../vettura/vettura.model';
import { UtenteViewService } from './utente-viewService';
import { AuthService } from '../login/login.service';

@Component({
  selector: 'app-utente-view',
  templateUrl: './utente-view.component.html',
  styleUrls: ['./utente-view.component.css']
})
export class UtenteViewComponent implements OnInit {
  vetturaSelezionata: Vettura | undefined;
  vetturaUtente: Vettura[] = [];
  currentUser: Persona | undefined;

  constructor(
    private utenteviewService: UtenteViewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.caricavetturaUtente();
    
  }

  caricavetturaUtente() {
    if (this.currentUser) {
      this.utenteviewService.getVettureUtente(this.currentUser.id).subscribe(
        (vetture: Vettura[]) => {
          this.vetturaUtente = vetture;
          console.log(this.vetturaUtente)
        },
        (error) => {
          console.error('Errore durante il recupero delle vetture:', error);
        }
      );
    }
  }
}
