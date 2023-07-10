import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtenteService } from './utenti.service';
import { Persona } from '../inserimento Persona/persona.model';
import { faPlus, faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';




@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {
  persone: Persona[] = []; // Dati delle persone
  isModificaEnabled: boolean[] = [];
  forms: FormGroup[] = []; // Array di FormGroup per i form
  isInsertClicked:boolean = false;

  
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  constructor(
    private formBuilder: FormBuilder,
    private utentiService: UtenteService,
    private router: Router) {}

  ngOnInit() {
    this.caricaUtenti();

  }
  onInsertClick(): void {
    this.isInsertClicked = true;
    this.utentiService.emitInsertClick(this.isInsertClicked);
  }
  caricaUtenti() {
    this.utentiService.getUtenti()
      .subscribe((utenti: Persona[]) => {
        this.persone = utenti;
      });
  }

  inizializzaForms() {
    // Creazione del form per ogni persona
    for (let persona of this.persone) {
      const form = this.formBuilder.group({
        id: [{ value: persona.id, disabled: true }, Validators.required],
        nome: [{ value: persona.nome, disabled: true }, Validators.required],
        cognome: [{ value: persona.cognome, disabled: true }, Validators.required],
        email: [{ value: persona.email, disabled: true }, Validators.required],
        codiceFiscale: [{ value: persona.codiceFiscale, disabled: true }, Validators.required],
        ruolo: [{ value: persona.ruolo.toString(), disabled: true }, Validators.required]
      });

      this.forms[persona.id] = form;
      this.isModificaEnabled[persona.id] = false;
    }
  }


abilitaModifica(personaId: number): void {
  this.isModificaEnabled[personaId] = true;
}
  modificaPersona(personaId: number): void {
    const persona: Persona | undefined = this.persone.find(p => p.id === personaId);

    if (persona) {
      const personaDaModificare: Persona = {
        id:personaId,
        nome: persona.nome,
        cognome: persona.cognome,
        email: persona.email,
        codiceFiscale: persona.codiceFiscale,
        password: '',
        ruolo: persona.ruolo
      };

      this.utentiService.updateUtenti(personaDaModificare).subscribe({
        next: updatedPersona => {
          alert("L'utente è stato aggiornato correttamente");
          console.log('Persona aggiornata:', updatedPersona);
          this.router.navigate(['admin/home/utenti']);
        },
        error: error => {
          alert("Errore: l'utente non è stato aggiornato");
          console.error('Errore durante l\'aggiornamento:', error);
          this.router.navigate(['admin/home/utenti']);
        }
      });
      // Ripristina l'icona "modifica"
      this.isModificaEnabled[personaId] = false;
    }
  }
  
  eliminaPersona(personaId: number): void {
    const persona: Persona | undefined = this.persone.find(p => p.id === personaId);
  
    if (persona) {
      this.utentiService.deleteUtente(persona).subscribe({
        next: (updatedPersona: Persona) => {
          alert("L'utente è stato eliminato correttamente");
          console.log('Persona eliminata:', updatedPersona);
          this.caricaUtenti();
          this.router.navigate(['admin/home/utenti']);
          
        },
        error: (error: any) => {
          alert("Errore: impossibile eliminare l'utente");
          console.error('Errore durante l\'eliminazione:', error);
         
        }
      });
    }
  }
  
  validaCodiceFiscale(personaId: number): boolean {
    const codF = this.forms[personaId]?.controls['codiceFiscale'].value;
    const codFError = document.getElementById(`codFError-${personaId}`);

    // Controllo per il codice fiscale
    const codFRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
    if (!codFRegex.test(codF)) {
      if (codFError) {
        codFError.innerText = 'Codice fiscale non valido. Assicurati di inserire un codice fiscale corretto.';
      }
      return false;
    } else {
      if (codFError) {
        codFError.innerText = '';
      }
      return true;
    }
  }

  validaEmail(personaId: number): boolean {
    const email = this.forms[personaId]?.controls['email'].value;
    const emailError = document.getElementById(`emailError-${personaId}`);

    // Controllo per l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (emailError) {
        emailError.innerText = 'Email non valida. Assicurati di inserire un indirizzo email valido.';
      }
      return false;
    } else {
      if (emailError) {
        emailError.innerText = '';
      }
    }
    return true;
  }

  validaForm(personaId: number): boolean {
    const isCodiceFiscaleValido = this.validaCodiceFiscale(personaId);
    const isEmailValida = this.validaEmail(personaId);

    return isCodiceFiscaleValido && isEmailValida;
  }
}
