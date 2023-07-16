import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PraticaTabUtenteService } from './pratica-tab-utente.service';
import { Pratica } from '../model/pratica.model';
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { Vettura } from '../vettura/vettura.model';
import { Persona } from '../inserimento Persona/persona.model';
import { dataModel } from '../pratica-tab/data.model';
import { AuthService } from '../login/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-pratica-tab-utente',
  templateUrl: './pratica-tab-utente.component.html',
  styleUrls: ['./Pratica-tab-utente.component.css'],
})
export class PraticaTabUtenteComponent implements OnInit {
  pratiche: Pratica[] = []; // Dati delle persones
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
  currentUser: Persona | undefined;
  

  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  constructor(
    private formBuilder: FormBuilder,
    private praticaTabUtenteService: PraticaTabUtenteService,
    private authService : AuthService,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Utente' + JSON.stringify(this.currentUser));
    this.caricaPratiche();
  }
  onInsertClick(): void {
    this.isClicked = true;
    this.praticaTabUtenteService.emitInsertClick(this.isClicked);
  }
  caricaPratiche() {
    if (this.currentUser) {
    this.praticaTabUtenteService.getPraticaUtente(this.currentUser.id).subscribe({
      next: (richieste: dataModel[]) => {
        console.log("richieste"+ richieste); 
        
        if (Array.isArray(richieste)) {
          this.pratiche = richieste.map(({ pratica }) => pratica);
          const { vettura, persona } = richieste[0];
          if(richieste[0] != null){
          this.vetturaSelezionata = vettura;
          this.personaSelezionata = persona;
          }else{
            console.error("Vettura error")
          }
        } else {
          console.error('Richieste vuote o non valide:', richieste);
        }
      },
      error: () => {
        console.error('Errore durante il recupero delle pratiche:');
      }
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
apriDialog(pratica: Pratica) {
  const dialogRef = this.dialog.open(PopupDialogComponent, {
    width: '400px',
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
