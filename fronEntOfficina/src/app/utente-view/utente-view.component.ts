import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/persona.model';
import { Vettura } from '../model/vettura.model';
import { UtenteService } from '../service/utente.service';
import { AuthService } from '../service/login.service';
import { Pratica } from '../model/pratica.model';
import { dataModel } from '../model/data.model';


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
    private utenteviewService: UtenteService,
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
