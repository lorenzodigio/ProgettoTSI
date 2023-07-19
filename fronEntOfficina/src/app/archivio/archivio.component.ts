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
  praticaSelezionata: Pratica | undefined;
  personaSelezionata: Persona | undefined;
  vetturaSelezionata: Vettura | undefined;
  expanded: boolean[] = [];
  pratica: Pratica = new Pratica();
  formattedFinePratica: string = '';
  richieste : dataModel[] = [];
  constructor(
    private praticaTabService: PraticaTabService,
    private dialog : MatDialog
  ) {}
  ngOnInit() {
    localStorage.removeItem("richieste")
    this.caricaPratiche();
  }
  caricaPratiche() {
    this.praticaTabService.getArchivio().subscribe({
      next: (richieste: dataModel[]) => {
        console.log(richieste); 
        const richiesteJSON = JSON.stringify(richieste);
        localStorage.setItem('archivio', richiesteJSON);
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
    const datiPratiche = localStorage.getItem('archivio');
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

