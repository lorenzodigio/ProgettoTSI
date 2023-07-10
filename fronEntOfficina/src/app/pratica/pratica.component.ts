import { Component } from '@angular/core';
import { Vettura } from '../vettura/vettura.model';
import { Persona } from '../inserimento Persona/persona.model';
import { Pratica } from '../model/pratica.model';
import { PraticaService } from './pratica.service';
import { Router } from '@angular/router';
import { UtenteService } from '../utenti/utenti.service';
import { VetturaService } from '../vettura/vettura.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pratica',
  templateUrl: './pratica.component.html',
  styleUrls: ['./pratica.component.css']
})
export class PraticaComponent {
  vetturaSelezionata: Vettura = new Vettura();
  constructor(private praticaService : PraticaService,
              private router: Router,
              private utentiService : UtenteService,
              private vetturaService : VetturaService){

  }
  
  pratica: Pratica = new Pratica();
  persona: Persona = new Persona();
  vettura: Vettura = new Vettura();
  persone: Persona[] = []; // Array per i dati delle persone dal database
  vetture: Vettura[] = []; // Array per i dati delle vetture dal database
  mostraCampiPersona: boolean = false;
  mostraCampiVettura: boolean = false;
  personaSelezionata : any = null;
  currentDate: string = '';
  disabilitaMenuVettura: boolean = false;

  ngOnInit(): void {
   this.caricaUtenti();
   this.caricaVetture();
   this.setInitialDate();
  }

  caricaUtenti() {
    this.utentiService.getUtenti()
      .subscribe((utenti: Persona[]) => {
        this.persone = utenti;
      });
  }

  caricaVetture(){
    this.vetturaService.getVetture()
    .subscribe((vetture: Vettura[]) => {
      this.vetture = vetture;
      console.log('Vetture:', this.vetture);
    });
  }

  aggiungiDati(){
    const data = {
      pratica: this.pratica,
      persona: this.persona,
      vettura: this.vettura
    };
    this.disabilitaMenuVettura = true;
    this.praticaService.inserisciPratica(data).subscribe({
      next: () => {
        alert("Pratica Inserita Correttamente")
        this.router.navigate(["/admin/home/pratiche"]);
      },
      error: (error) => {
        console.error('Errore durante l\'inserimento della pratica:', error);
        alert('Errore inserimento pratica')
        this.router.navigate(["/admin/home/pratiche"]);
      }
    });
  }
  setInitialDate() {
    const currentDate = moment().format('YYYY-MM-DD');
    this.pratica.inizioPratica = currentDate;
  }
  mostraCampoPersona() {
  this.mostraCampiPersona = !this.mostraCampiPersona;
  this.disabilitaMenuVettura = this.mostraCampiPersona; // Disabilita il menu a tendina della vettura se i campi della persona sono visibili
}
}

