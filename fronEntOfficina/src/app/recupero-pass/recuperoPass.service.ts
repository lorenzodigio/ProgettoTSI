import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecuperoService {
    private backendUrl = 'http://localhost:8080/login';
    

    constructor(private http: HttpClient) {}
  
    postRecupero(codiceFiscale: string) {
      const url = `${this.backendUrl}/passD?codiceFiscale=${codiceFiscale}`;
      return this.http.post(url, {});
    }
   
  }
  