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
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-praticaTab',
  templateUrl: './pratica-tab.component.html',
  styleUrls: ['./Pratica-tab.component.css'],
})
export class PraticaTabComponent implements OnInit {
  pratiche: Pratica[] = [];
  isModificaEnabled: boolean[] = [];
  forms: FormGroup[] = [];
  praticaSelezionata: Pratica | undefined;
  personaSelezionata: Persona | undefined;
  vetturaSelezionata: Vettura | undefined;
  expanded: boolean[] = [];
  pratica: Pratica = new Pratica();
  formattedFinePratica: string = '';
  richieste: dataModel[] = [];
  vettura?: Vettura;
  persona?: Persona;

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  constructor(
    private formBuilder: FormBuilder,
    private praticaTabService: PraticaTabService,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.caricaPratiche();
  }

  caricaPratiche() {
    this.praticaTabService.getPratica().subscribe({
      next: (richieste: dataModel[]) => {
        console.log(richieste);

        const richiesteJSON = JSON.stringify(richieste);
        localStorage.setItem('richieste', richiesteJSON);
        if (Array.isArray(richieste)) {
          this.pratiche = richieste.map(({ pratica }) => pratica);
          const { vettura, persona } = richieste[0];
          this.vetturaSelezionata = vettura;
          this.personaSelezionata = persona;
        }
      },
      error: () => {
        this.toast.error('Errore durante il recupero delle pratiche');
      },
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
    const pratica: Pratica | undefined = this.pratiche.find(
      (p) => p.id === praticaId
    );
    if (pratica) {
      if (pratica.finePratica) {
        const formattedFinePratica = moment(pratica.finePratica).format(
          'YYYY-MM-DD'
        ); // Formatta la data come stringa nel formato desiderato
        pratica.finePratica = formattedFinePratica;
      }
      // Esegui il casting della data a stringa
      pratica.inizioPratica = pratica.inizioPratica.toString();

      this.praticaTabService.updatePratica(pratica).subscribe({
        next: () => {
          this.toast.success('La pratica è stata aggiornata correttamente');
          this.caricaPratiche();
          this.router.navigate(['admin/home/pratiche']);
        },
        error: () => {
          this.toast.error('Errore: la pratica non è stata aggiornata');
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
    if (!this.isModificaEnabled[praticaId]) {
      const pratica: Pratica | undefined = this.pratiche.find(
        (p) => p.id === praticaId
      );

      if (pratica) {
        this.praticaTabService.deletePratica(pratica).subscribe({
          next: () => {
            this.toast.success('La pratica è stata eliminato correttamente');
            this.caricaPratiche();
            this.router.navigate(['admin/home/pratiche']);
          },
          error: () => {
            this.toast.error('Errore: impossibile eliminare la pratica');
          },
        });
      }
    }
  }
  selezionaPratica(pratica: Pratica): void {
    this.praticaSelezionata = pratica;
  }

  apriDialog(pratica: Pratica) {
    const datiPratiche = localStorage.getItem('richieste');
    if (datiPratiche) {
      const datiPraticheArray: dataModel[] = JSON.parse(datiPratiche);
  
      // Trova la pratica corrispondente con l'id fornito
      const praticaCorrispondente = datiPraticheArray.find((p) => p.pratica.id === pratica.id);
  
      if (praticaCorrispondente) {
        console.log('Sono id ' + praticaCorrispondente.pratica.id);
  
        const dialogRef = this.dialog.open(PopupDialogComponent, {
          height: '400px',
          width: '600px',
          data: {
            persona: praticaCorrispondente.persona,
            vettura: praticaCorrispondente.vettura,
          },
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          console.log('Dialog chiuso');
        });
      } else {
        console.log('Vettura o persona associata non trovata.');
      }
    }
  }
  
}
