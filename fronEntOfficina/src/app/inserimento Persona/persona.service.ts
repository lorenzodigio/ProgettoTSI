import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from './persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private baseUrl = 'http://localhost:8080/admin/home/salva';

  constructor(private http: HttpClient) {}

  inserisciPersona(persona: Persona): Observable<any> {
    return this.http.post(this.baseUrl, persona);
  }
}
