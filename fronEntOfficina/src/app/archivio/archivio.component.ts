import { Component } from '@angular/core';
import { Persona } from '../inserimento Persona/persona.model';
import { Pratica } from '../model/pratica.model';
import { Vettura } from '../vettura/vettura.model';
import { dataModel } from '../pratica-tab/data.model';
import { PraticaTabService } from '../pratica-tab/praticaTabService';
import { Router } from '@angular/router';

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
