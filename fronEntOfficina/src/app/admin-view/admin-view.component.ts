import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Pratica } from '../model/pratica.model';
import { Persona } from '../model/persona.model';
import { Vettura } from '../model/vettura.model';
import { dataModel } from '../model/data.model';
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

  constructor(private praticaTab : AdminService,
    private router: Router){}

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

