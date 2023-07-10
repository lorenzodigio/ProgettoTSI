import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Persona } from '../inserimento Persona/persona.model';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  private backendUrl = 'http://localhost:8080/admin/home'; // Aggiorna con l'URL corretto del tuo backend
  private insertClickSubject = new Subject<boolean>();
  inserimentoClick$ = this.insertClickSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUtenti(): Observable<Persona[]> {
    const url = `${this.backendUrl}/utenti`; // Utilizza il backtick (grave accent) per interpolare la variabile
    return this.http.get<Persona[]>(url); // Utilizza la variabile url invece di inserire il testo 'url'
  }
  emitInsertClick(isInserimentoClicked: boolean): void {
    this.insertClickSubject.next(isInserimentoClicked);
  }
  updateUtenti(persona: Persona): Observable<Persona> {
    const url = `${this.backendUrl}/modificaPersona`;
    return this.http.post<Persona>(url, persona);
  }
  deleteUtente(persona: Persona): Observable<Persona> {
    const url = `${this.backendUrl}/eliminaPersona`;
    return this.http.post<Persona>(url, persona);
  }
}
