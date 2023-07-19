import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pratica } from '../model/pratica.model';
import { dataModel } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class PraticaTabService {
  private backendUrl = 'http://localhost:8080/admin/home'; // Aggiorna con l'URL corretto del tuo backend


  constructor(private http: HttpClient) {}

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