import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { dataModel } from '../pratica-tab/data.model';

@Injectable({
  providedIn: 'root',
})
export class ArchivioUtenteService {
  private backendUrl = 'http://localhost:8080/home';

  constructor(private http: HttpClient) {}

  getPraticaUtente(id:number): Observable<dataModel[]> {
    const url = `${this.backendUrl}/archivioUtente/${id}`; 
    return this.http.get<dataModel[]>(url); 
  }
}