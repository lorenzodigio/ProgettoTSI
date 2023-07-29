import { Component } from '@angular/core';
import { AuthService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recupero-pass',
  templateUrl: './recupero-pass.component.html',
  styleUrls: ['./recupero-pass.component.css']
})
export class RecuperoPassComponent {
  codiceFiscale = '';
  constructor(private recuperoPass: AuthService,
    private  toast: ToastrService) {}

  inviaRichiestaRecupero(codiceFiscale: string) {
    this.recuperoPass.postRecupero(codiceFiscale).subscribe({
      next: (response: Object) => {
        this.toast.success("Recupero Password accettato, email inviata")
        console.log('Richiesta POST inviata correttamente');
      },
      error: (error: any) => {
        this.toast.error("Errore recupero passowrd: Codice Fiscale non valido")
        console.error('Errore nell\'invio della richiesta POST', error);
      },
    });
  }
}
