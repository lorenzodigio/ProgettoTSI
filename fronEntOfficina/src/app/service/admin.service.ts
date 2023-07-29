import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Persona } from '../model/persona.model';
import { Vettura } from '../model/vettura.model';
import { dataModel } from '../model/data.model';
import { Pratica } from '../model/pratica.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  persona: Persona = new Persona();
  vettura: Vettura = new Vettura();
  private backendUrl = 'http://localhost:8080/admin/home'; // Aggiorna con l'URL corretto del tuo backend
  private insertClickSubject = new Subject<boolean>();
  inserimentoClick$ = this.insertClickSubject.asObservable();
  data = {
    persona: this.persona,
    vettura: this.vettura,
 };


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
  getVetture(): Observable<Vettura[]> {
    const url = `${this.backendUrl}/vetture`; 
    return this.http.get<Vettura[]>(url); 
  }

  getVettureByPersona(id:number):Observable<Vettura[]>{
    const url = `${this.backendUrl}/vetture/${id}`;
    return this.http.get<Vettura[]>(url); 
  }
  inserisciPratica(data : dataModel): Observable<any> {
    const url = `${this.backendUrl}/aggiungiPratica`; 
    return this.http.post<dataModel>(url, data);
  }
  getPratica(): Observable<dataModel[]> {
    const url = `${this.backendUrl}/pratiche`; // Utilizza il backtick (grave accent) per interpolare la variabile
    return this.http.get<dataModel[]>(url); // Utilizza la variabile url invece di inserire il testo 'url'
  }
  updatePratica(pratica: Pratica): Observable<Pratica> {
    const url = `${this.backendUrl}/modificaPratica`;
    return this.http.post<Pratica>(url, pratica);
  }
  deletePratica(pratica: Pratica): Observable<Pratica> {
    const url = `${this.backendUrl}/eliminaPratica`;
    return this.http.post<Pratica>(url, pratica);
  }
  getArchivio(): Observable<dataModel[]>{
  const url = `${this.backendUrl}/archivio`; 
    return this.http.get<dataModel[]>(url);
   } 
}
