import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vettura } from '../model/vettura.model';
import { dataModel } from '../model/data.model';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  private backendUrl = 'http://localhost:8080/home';
  constructor(private http: HttpClient) {}

  getVettureUtente(id: number): Observable<Vettura[]> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.get<Vettura[]>(url);
  }
  getPraticheUtente(id: number): Observable<dataModel[]> {
    const url = `${this.backendUrl}/praticheUtente/${id}`;
    return this.http.get<dataModel[]>(url);
  }
  getArchivioUtente(id: number): Observable<dataModel[]> {
    const url = `${this.backendUrl}/archivioUtente/${id}`;
    return this.http.get<dataModel[]>(url);
  }
}
