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
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { Router } from '@angular/router';
import { Vettura } from '../vettura/vettura.model';
import { Persona } from '../inserimento Persona/persona.model';
import * as moment from 'moment';
import { dataModel } from './data.model';
import { MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


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
    private router: Router,
    private dialog : MatDialog,
    private toast : ToastrService
  ) {}

  ngOnInit() {
    this.caricaPratiche();
  }
  onInsertClick(): void {
    this.isClicked = true;
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
          this.toast.success("La pratica è stata aggiornata correttamente");
          this.caricaPratiche();
          this.router.navigate(['admin/home/pratiche']);
        },
        error: () => {
          this.toast.error("Errore: la pratica non è stata aggiornata");
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
          this.toast.success('La pratica è stata eliminato correttamente');
          this.caricaPratiche();
          this.router.navigate(['admin/home/pratiche']);
        },
        error: (error: any) => {
          this.toast.error('Errore: impossibile eliminare la pratica');

        },
      });
    }
  }
  selezionaPratica(pratica: Pratica): void {
    this.praticaSelezionata = pratica;
  }

  apriDialog(pratica: Pratica) {
    if (!this.isModificaEnabled[pratica.id]) {
      const dialogRef = this.dialog.open(PopupDialogComponent, {
        height: '400px',
        width: '600px',
        data: {
          persona: this.personaSelezionata,
          vettura: this.vetturaSelezionata
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog chiuso');
      });
    }
  }
}
