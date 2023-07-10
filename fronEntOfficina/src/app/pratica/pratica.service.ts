import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../inserimento Persona/persona.model';
import { Vettura } from '../vettura/vettura.model';
import { Pratica } from '../model/pratica.model';
@Injectable({
  providedIn: 'root',
})
export class PraticaService {
   persona: Persona = new Persona();
   vettura: Vettura = new Vettura();
    private baseUrl = 'http://localhost:8080/admin/home/aggiungiPratica';
   data = {
      persona: this.persona,
      vettura: this.vettura,
   };

    constructor(private http: HttpClient) {}

    inserisciPratica(data : any): Observable<any> {
    return this.http.post(this.baseUrl,data);
  }

}
