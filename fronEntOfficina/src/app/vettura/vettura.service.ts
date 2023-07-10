import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vettura } from './vettura.model';

@Injectable({
  providedIn: 'root',
})
export class VetturaService {
  private backendUrl = 'http://localhost:8080/admin/home'; 


  constructor(private http: HttpClient) {}

  getVetture(): Observable<Vettura[]> {
    const url = `${this.backendUrl}/vetture`; 
    return this.http.get<Vettura[]>(url); 
  }

  getVettureByPersona(id:number):Observable<Vettura[]>{
    const url = `${this.backendUrl}/vetture/${id}`;
    return this.http.get<Vettura[]>(url); 
  }
}