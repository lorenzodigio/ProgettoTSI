import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './persona.service';
import { Persona } from './persona.model';


@Component({
  selector: 'app-inserimento-persona',
  templateUrl: './inserimento-persona.component.html',
  styleUrls: ['./inserimento-persona.component.css']
})
export class InserimentoPersonaComponent {
  isUtentiClicked : boolean = false;
  isInserimentoClicked : boolean = false
  persona: Persona = {
    id: 0,
    nome: '',
    cognome: '',
    email: '',
    codiceFiscale: '',
    password: '',
    ruolo: 0
  };

  emailErrorMessage: string = '';
  codFErrorMessage: string = '';

  constructor(private router: Router, 
    private personaService: PersonaService) {}

  insertPersona(): void {
    // Validazione
    if (!this.validaCodiceFiscale() || !this.validaEmail()) {
      return;
    }
    console.log(this.persona);
    this.personaService.inserisciPersona(this.persona).subscribe({
      next: (v) => {
        alert("Registrazione completata");
        this.router.navigate(["/admin/home/utenti"]);
      },
      error: () => {
        alert("Registrazione non riuscita,codice fiscale gia esistente");
        this.router.navigate(["/admin/home/inserimentoPersona"]);
      }
    });
  }
  validaCodiceFiscale(): boolean {
    // Logica di validazione del Codice Fiscale
    if (this.persona.codiceFiscale.length !== 16) {

        alert('Codice fiscale non valido. Assicurati che sia composto da 16 caratteri.');
      return false;
    } else {
      this.codFErrorMessage = '';
         return true;
    }
  }

  validaEmail(): boolean {
    // Logica di validazione dell'Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.persona.email)) {
        alert('Email non valida. Assicurati di inserire un indirizzo email valido.');
      return false;
    } else{
      return true;
    }
    
  }
}
