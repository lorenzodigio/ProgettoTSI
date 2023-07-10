import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { dataModel } from '../pratica-tab/data.model';

@Injectable({
  providedIn: 'root',
})
export class PraticaTabUtenteService {
  private backendUrl = 'http://localhost:8080/home';
  private insertClickSubject = new Subject<boolean>();
  inserimentoClick$ = this.insertClickSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPraticaUtente(id:number): Observable<dataModel[]> {
    const url = `${this.backendUrl}/praticheUtente/${id}`; 
    return this.http.get<dataModel[]>(url); 
  }
  emitInsertClick(isInserimentoClicked: boolean): void {
    this.insertClickSubject.next(isInserimentoClicked);
  }
}