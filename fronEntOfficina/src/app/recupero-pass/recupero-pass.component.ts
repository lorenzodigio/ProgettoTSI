import { Component } from '@angular/core';
import { RecuperoService } from './recuperoPass.service';

@Component({
  selector: 'app-recupero-pass',
  templateUrl: './recupero-pass.component.html',
  styleUrls: ['./recupero-pass.component.css']
})
export class RecuperoPassComponent {
  codiceFiscale = '';
  constructor(private recuperoPass: RecuperoService) {}

  inviaRichiestaRecupero(codiceFiscale: string) {
    this.recuperoPass.postRecupero(codiceFiscale).subscribe({
      next: (response: Object) => {
        alert("Recupero Password accettato, email inviata")
        console.log('Richiesta POST inviata correttamente');
      },
      error: (error: any) => {
        alert("Errore recupero passowrd: Codice Fiscale non valido")
        console.error('Errore nell\'invio della richiesta POST', error);
      },
    });
  }
}
