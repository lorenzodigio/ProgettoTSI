import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Pratica } from '../model/pratica.model';
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { Vettura } from '../model/vettura.model';
import { Persona } from '../model/persona.model';
import { dataModel } from '../model/data.model';
import { AuthService } from '../service/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-arichivio-utente',
  templateUrl: './archivio-utente.component.html',
  styleUrls: ['./archivio-utente.component.css'],
})
export class ArchivioUtenteComponent implements OnInit {
  pratiche: Pratica[] = []; // Dati delle persones
  forms: FormGroup[] = []; // Array di FormGroup per i form
  praticaSelezionata: Pratica | undefined;
  personaSelezionata: Persona | undefined;
  vetturaSelezionata: Vettura | undefined;
  expanded: boolean[] = [];

  pratica: Pratica = new Pratica();
  formattedFinePratica: string = '';
  richieste: dataModel[] = [];
  currentUser?: Persona;

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  constructor(
    private formBuilder: FormBuilder,
    private archivioUtente: UtenteService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Utente' + JSON.stringify(this.currentUser));
    localStorage.removeItem("richieste-utente")
    localStorage.removeItem("richieste")
    localStorage.removeItem("archivio")
    this.caricaPratiche();
  }
  caricaPratiche() {
    if (this.currentUser) {
      this.archivioUtente.getArchivioUtente(this.currentUser.id).subscribe({
        next: (richieste: dataModel[]) => {
          const richiesteJSON = JSON.stringify(richieste);
          localStorage.setItem('archivio-utente', richiesteJSON);
          if (Array.isArray(richieste)) {
            this.pratiche = richieste.map(({ pratica }) => pratica);
            const { vettura, persona } = richieste[0];
            if (richieste[0] != null) {
              this.vetturaSelezionata = vettura;
              this.personaSelezionata = persona;
            } else {
              console.error('Vettura error');
            }
          } else {
            console.error('Richieste vuote o non valide:', richieste);
          }
        },
        error: () => {
        },
      });
    }
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
    }
  }

  selezionaPratica(pratica: Pratica): void {
    this.praticaSelezionata = pratica;
   
  }

  apriDialog(pratica: Pratica) {
    const datiPratiche = localStorage.getItem('archivio-utente');
    if (datiPratiche) {
      const datiPraticheArray: dataModel[] = JSON.parse(datiPratiche);
  
      // Trova la pratica corrispondente con l'id fornito
      const praticaCorrispondente = datiPraticheArray.find((p) => p.pratica.id === pratica.id);
  
      if (praticaCorrispondente) {
  
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
