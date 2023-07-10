import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PraticaTabService } from './praticaTabService';
import { Pratica } from '../model/pratica.model';
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';
import { Vettura } from '../vettura/vettura.model';
import { Persona } from '../inserimento Persona/persona.model';
import * as moment from 'moment';
import { dataModel } from './data.model';

@Component({
  selector: 'app-praticaTab',
  templateUrl: './pratica-tab.component.html',
  styleUrls: ['./Pratica-tab.component.css'],
})
export class PraticaTabComponent implements OnInit {
  pratiche: Pratica[] = []; // Dati delle persone
  isModificaEnabled: boolean[] = [];
  forms: FormGroup[] = []; // Array di FormGroup per i form
  isClicked: boolean = false;
  praticaSelezionata: Pratica | undefined;
  personaSelezionata: Persona | undefined;
  vetturaSelezionata: Vettura | undefined;
  expanded: boolean[] = [];
  dettagliPraticaVisible = false;
  pratica: Pratica = new Pratica();
  formattedFinePratica: string = '';
  richieste : dataModel[] = [];
  

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  constructor(
    private formBuilder: FormBuilder,
    private praticaTabService: PraticaTabService,
    private router: Router
  ) {}

  ngOnInit() {
    this.caricaPratiche();
  }
  onInsertClick(): void {
    this.isClicked = true;
    this.praticaTabService.emitInsertClick(this.isClicked);
  }
  caricaPratiche() {
    this.praticaTabService.getPratica().subscribe({
      next: (richieste: dataModel[]) => {
        console.log(richieste); // Verifica il valore dell'array richieste nella console
        
        if (Array.isArray(richieste)) {
          this.pratiche = richieste.map(({ pratica }) => pratica);
          const { vettura, persona } = richieste[0];
          this.vetturaSelezionata = vettura;
          this.personaSelezionata = persona;
        } else {
          console.error('Richieste vuote o non valide:', richieste);
        }
      },
      error: () => {
        console.error('Errore durante il recupero delle pratiche:');
      }
    });
  }

  inizializzaForms() {
    // Creazione del form per ogni pratica
    for (let pratica of this.pratiche) {  
      const form = this.formBuilder.group({
        id: [{ value: pratica.id, disabled: true }, Validators.required],
        nomePratica: [
          { value: pratica.nomePratica, disabled: true },
          Validators.required,
        ],
        inizioPratica: [
          { value: pratica.inizioPratica, disabled: true },
          Validators.required,
        ],
        incorso: [
          { value: pratica.incorso, disabled: true },
          Validators.required,
        ],
        finePratica: [
          { value: pratica.finePratica, disabled: true },
          Validators.required,
        ],
      });

      this.forms[pratica.id] = form;
      this.isModificaEnabled[pratica.id] = false;
    }
  }

  abilitaModifica(praticaId: number): void {
    this.isModificaEnabled[praticaId] = true;
  }

  modificaPratica(praticaId: number): void {
    const pratica: Pratica | undefined = this.pratiche.find(p => p.id === praticaId );
    if (pratica) {
      if (pratica.finePratica) {
        const formattedFinePratica = moment(pratica.finePratica).format('YYYY-MM-DD'); // Formatta la data come stringa nel formato desiderato
        pratica.finePratica = formattedFinePratica;
      }
      // Esegui il casting della data a stringa
      pratica.inizioPratica = pratica.inizioPratica.toString();
    
      this.praticaTabService.updatePratica(pratica).subscribe({
        next: () => {
          alert("La pratica è stata aggiornata correttamente");
          console.log('pratica aggiornata:', pratica);
          this.caricaPratiche();
          this.router.navigate(['admin/home/pratiche']);
        },
        error: () => {
          alert("Errore: la pratica non è stata aggiornata");
          console.error("Errore durante l'aggiornamento:");
          this.caricaPratiche();
          this.router.navigate(['admin/home/pratiche']);
        },
      });
    
      // Ripristina l'icona "modifica"
      this.isModificaEnabled[praticaId] = false;
    }
  }
  
  

  eliminapratica(praticaId: number): void {
    const pratica: Pratica | undefined = this.pratiche.find(
      (p) => p.id === praticaId
    );

    if (pratica) {
      this.praticaTabService.deletePratica(pratica).subscribe({
        next: (updatedpratica: Pratica) => {
          alert('La pratica è stata eliminato correttamente');
          console.log('pratica eliminata:', updatedpratica);
          this.caricaPratiche();
          this.router.navigate(['admin/home/pratiche']);
        },
        error: (error: any) => {
          alert('Errore: impossibile eliminare la pratica');
          console.error("Errore durante l'eliminazione:", error);
        },
      });
    }
  }
  selezionaPratica(pratica: Pratica): void {
    this.praticaSelezionata = pratica;
    // Puoi anche fare altre operazioni o chiamate a servizi qui se necessario
  }
  toggleDettagliPratica(pratica: Pratica): void {
    if (this.praticaSelezionata === pratica) {
      this.praticaSelezionata = undefined;
    } else {
      this.praticaSelezionata = pratica;
      this.dettagliPraticaVisible = !this.dettagliPraticaVisible;
    }
  }
  isDettagliPraticaVisible(pratica: Pratica): boolean {
    return this.praticaSelezionata && this.praticaSelezionata.id === pratica.id || false;
  }
  
  // Funzione per chiudere i dettagli della pratica quando viene cliccato l'overlay
  chiudiDettagliPratica() {
    this.dettagliPraticaVisible = false;
  }
}
