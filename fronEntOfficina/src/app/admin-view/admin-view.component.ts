import { Component, OnInit } from '@angular/core';
import { PraticaTabService } from '../pratica-tab/praticaTabService';
import { Pratica } from '../model/pratica.model';
import { Persona } from '../inserimento Persona/persona.model';
import { Vettura } from '../vettura/vettura.model';
import { dataModel } from '../pratica-tab/data.model';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  pratiche: Pratica[] = []; // Dati delle persone
  praticaSelezionata: Pratica | undefined;
  personaSelezionata: Persona | undefined;
  vetturaSelezionata: Vettura | undefined;
  pratica: Pratica = new Pratica();
  richieste : dataModel[] = [];

  constructor(private praticaTab : PraticaTabService){}



  ngOnInit() {
    this.caricaPratiche();
  }
  caricaPratiche() {
    this.praticaTab.getPratica().subscribe({
      next: (richieste: dataModel[]) => {
        console.log(richieste);
        
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
}

