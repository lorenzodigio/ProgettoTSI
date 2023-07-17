import { Component } from '@angular/core';
import { Persona } from '../inserimento Persona/persona.model';
import { Pratica } from '../model/pratica.model';
import { Vettura } from '../vettura/vettura.model';
import { dataModel } from '../pratica-tab/data.model';
import { PraticaTabService } from '../pratica-tab/praticaTabService';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-archivio',
  templateUrl: './archivio.component.html',
  styleUrls: ['./archivio.component.css']
})
export class ArchivioComponent {
  pratiche: Pratica[] = []; // Dati delle persone
  isModificaEnabled: boolean[] = [];
  isClicked: boolean = false;
  praticaSelezionata: Pratica | undefined;
  personaSelezionata: Persona | undefined;
  vetturaSelezionata: Vettura | undefined;
  expanded: boolean[] = [];
  dettagliPraticaVisible = false;
  pratica: Pratica = new Pratica();
  formattedFinePratica: string = '';
  richieste : dataModel[] = [];
  constructor(
    private praticaTabService: PraticaTabService,
    private dialog : MatDialog
  ) {}
  ngOnInit() {
    this.caricaPratiche();
  }
  onInsertClick(): void {
    this.isClicked = true;
    this.praticaTabService.emitInsertClick(this.isClicked);
  }
  caricaPratiche() {
    this.praticaTabService.getArchivio().subscribe({
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
      error: (error) => {
        console.error('Errore durante il recupero delle pratiche:', error);
      }
    });
  }
  apriDialog(pratica: Pratica) {
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

