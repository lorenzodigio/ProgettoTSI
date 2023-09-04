import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// Importa il tipo TDocumentDefinitions direttamente da pdfmake
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  async generatePDF() {
    // Estrai i dati dal MAT_DIALOG_DATA
    const data = this.data;

    // Crea il documento PDF con il tipo di carattere personalizzato
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Informazioni Utente:', style: 'header' },
        { text: `Nome: ${data.persona?.nome}`, style: 'fugazOne' },
        { text: `Cognome: ${data.persona?.cognome}`, style: 'fugazOne' },
        { text: `Email: ${data.persona?.email}`, style: 'fugazOne' },
        { text: `Codice Fiscale: ${data.persona?.codiceFiscale}`, style: 'fugazOne' },
        { text: 'Informazioni Vettura:', style: 'header' },
        { text: `Targa: ${data.vettura?.targa}`, style: 'fugazOne' },
        { text: `Modello: ${data.vettura?.modello}`, style: 'fugazOne' },
        { text: `Anno Immatricolazione: ${data.vettura?.immatricolazione}`, style: 'fugazOne' },
        { text: `Kilometri Attuali: ${data.vettura?.kilometraggio}`, style: 'fugazOne' },
        { text: `Ultimo Tagliando: ${data.vettura?.tagliando}`, style: 'fugazOne' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10], // Alto, Destra, Basso, Sinistra
        },
        fugazOne: {
          fontSize: 14,
        },
      },
    };

    // Genera il PDF e aprilo in una nuova finestra del browser
    pdfMake.createPdf(docDefinition).download();
  }
}
