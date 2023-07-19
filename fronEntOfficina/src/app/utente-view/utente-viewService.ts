import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vettura } from '../vettura/vettura.model';
import { Pratica } from '../model/pratica.model';
import { dataModel } from '../pratica-tab/data.model';

@Injectable({
  providedIn: 'root',
})
export class UtenteViewService {
  private backendUrl = 'http://localhost:8080'; 
  constructor(private http: HttpClient) {}

  getVettureUtente(id:number): Observable<Vettura[]>{
  const url = `${this.backendUrl}/home/${id}`; 
    return this.http.get<Vettura[]>(url);
   } 
   getPraticheUtente(id:number): Observable<dataModel[]>{
    const url = `${this.backendUrl}/home/praticheUtente/${id}`; 
      return this.http.get<dataModel[]>(url);
     } 
}