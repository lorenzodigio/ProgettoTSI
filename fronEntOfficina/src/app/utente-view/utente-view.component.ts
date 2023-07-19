import { Component, OnInit } from '@angular/core';
import { Persona } from '../inserimento Persona/persona.model';
import { Vettura } from '../vettura/vettura.model';
import { UtenteViewService } from './utente-viewService';
import { AuthService } from '../login/login.service';
import { Pratica } from '../model/pratica.model';
import { dataModel } from '../pratica-tab/data.model';


@Component({
  selector: 'app-utente-view',
  templateUrl: './utente-view.component.html',
  styleUrls: ['./utente-view.component.css']
})
export class UtenteViewComponent implements OnInit {
  vetturaSelezionata: Vettura | undefined;
  vetturaUtente: Vettura[] = [];
  currentUser: Persona | undefined;
  praticaUtente: dataModel[] = [];
  

  constructor(
    private utenteviewService: UtenteViewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.caricavetturaUtente();
    this.caricaPraticaUtente();
    
  }
  caricaPraticaUtente() {
    if (this.currentUser) {
      this.utenteviewService.getPraticheUtente(this.currentUser.id).subscribe(
        (pratica: dataModel[]) => {
          this.praticaUtente = pratica;
          console.log(this.praticaUtente)
        },
        (error) => {
          console.error('Errore durante il recupero delle pratiche:', error);
        }
      );
    }
  }
  caricavetturaUtente() {
    if (this.currentUser) {
      this.utenteviewService.getVettureUtente(this.currentUser.id).subscribe(
        (vetture: Vettura[]) => {
          this.vetturaUtente = vetture;
        },
        (error) => {
          console.error('Errore durante il recupero delle vetture:', error);
        }
      );
    }
  }
}
