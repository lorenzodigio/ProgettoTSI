export class Vettura {
    id:number;
    targa: string;
    modello: string;
    immatricolazione: string;
    tagliando: Date;
    kilometraggio: number;
    fk_id_persona: number;
  
    constructor() {
      this.id = 0;
      this.targa = '';
      this.modello = '';
      this.immatricolazione = '';
      this.tagliando = new Date();
      this.kilometraggio = 0 ;
      this.fk_id_persona = 0;
    }

    toString(): string {
      return this.id + ' ' + this.targa + ' ' + this.modello;
    }
  }
  