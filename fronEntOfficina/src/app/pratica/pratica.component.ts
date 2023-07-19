import { Component } from '@angular/core';
import { Vettura } from '../vettura/vettura.model';
import { Persona } from '../inserimento Persona/persona.model';
import { Pratica } from '../model/pratica.model';
import { PraticaService } from './pratica.service';
import { Router } from '@angular/router';
import { UtenteService } from '../utenti/utenti.service';
import { VetturaService } from '../vettura/vettura.service';
import * as moment from 'moment';
import {
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pratica',
  templateUrl: './pratica.component.html',
  styleUrls: ['./pratica.component.css'],
})
export class PraticaComponent {
  vetturaSelezionata: Vettura = new Vettura();
  matcher = new MyErrorStateMatcher();
  pratica: Pratica = new Pratica();
  persona: Persona = new Persona();
  vettura: Vettura = new Vettura();
  persone: Persona[] = []; // Array per i dati delle persone dal database
  vetture: Vettura[] = []; // Array per i dati delle vetture dal database
  campoPersona: boolean = false;
  campoVettura: boolean = false;
  personaSelezionata: any = null;
  currentDate: string = '';
  disabilitaMenuVettura: boolean = false;
  vettureFiltrate: Vettura[] = []; // Array per i dati delle vetture dal database

  codiceFiscaleControl = new FormControl('', Validators.required);
  matcherF = new MyErrorStateMatcher();

  constructor(
    private praticaService: PraticaService,
    private router: Router,
    private utentiService: UtenteService,
    private vetturaService: VetturaService,
    private toast: ToastrService
  ) {
    this.codiceFiscaleControl.setValidators(this.codiceFiscaleValidator);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {
    this.caricaUtenti();
    this.setInitialDate();
  }
  caricaUtenti() {
    this.utentiService.getUtenti().subscribe((utenti: Persona[]) => {
      this.persone = utenti;
    });
  }

  selezionaUtente(id: number) {
    console.log('selezionaUtente called with id:', id);
    this.vetturaService
      .getVettureByPersona(id)
      .subscribe((vetture: Vettura[]) => {
        this.vettureFiltrate = vetture;
        console.log(this.vettureFiltrate);
        this.personaSelezionata = true;
      });
  }

  aggiungiDati() {
    if (this.vettura.tagliando && this.vettura.immatricolazione) {
      const tagliandoDate = new Date(this.vettura.tagliando);
      const immatricolazioneDate = new Date(this.vettura.immatricolazione);

      if (tagliandoDate < immatricolazioneDate) {
        this.toast.error('La data del tagliando non può essere precedente alla data di immatricolazione.');
        return; 
      }
      if(this.vettura.kilometraggio <= 0){
        this.toast.error('Errore Kilometraggio.');
        return; 
      }
    }
    const data = {
      pratica: this.pratica,
      persona: this.persona,
      vettura: this.vettura,
    };
    this.disabilitaMenuVettura = true;
    this.praticaService.inserisciPratica(data).subscribe({
      next: () => {
        this.toast.success('Pratica Inserita Correttamente');
        this.router.navigate(['/admin/home/pratiche']);
      },
      error: (error) => {
        switch (error.status) {
          case 400:
            this.toast.error('Errore: Persona già esistente.');
            this.router.navigate(['/admin/home/pratiche']);
            break;
          case 403:
            this.toast.error('Errore: Vettura già esistente.');
            this.router.navigate(['/admin/home/pratiche']);
            break;
        }
      },
    });
  }
  setInitialDate() {
    const currentDate = moment().format('YYYY-MM-DD');
    this.pratica.inizioPratica = currentDate;
  }
  mostraCampoPersona() {
    this.campoPersona = !this.campoPersona;
    this.campoVettura = false;
  }
  showCampiVettura() {
    this.campoVettura = !this.campoVettura;
    this.campoPersona = false;
  }

  codiceFiscaleValidator(control: AbstractControl): ValidationErrors | null {
    if (control instanceof FormControl) {
      const cf = control.value.toUpperCase();

      // Verifica la lunghezza del codice fiscale
      if (cf.length !== 16) {
        return { codiceFiscale: true };
      }

      // Verifica la validità dei caratteri
      const validCharacters = /^[A-Z0-9]+$/;
      if (!validCharacters.test(cf)) {
        return { codiceFiscale: true };
      }
    }

    return null; // Il Codice Fiscale è valido
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    const invalidCtrl = !!(control && control.invalid);
    const touched = !!(control && (control.dirty || control.touched));
    const submitted = form && form.submitted;

    return invalidCtrl && (touched || submitted);
  }
}
