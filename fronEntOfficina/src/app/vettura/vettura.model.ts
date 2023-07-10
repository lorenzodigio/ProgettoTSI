export class Vettura {
    id:number;
    targa: string;
    modello: string;

    immatricolazione: string;
    tagliando: Date;
    fk_id_persona: number;
  
    constructor() {
      this.id = 0;
      this.targa = '';
      this.modello = '';
      this.immatricolazione = '';
      this.tagliando = new Date();
      this.fk_id_persona = 0;
    }

    toString(): string {
      return this.id + ' ' + this.targa + ' ' + this.modello;
    }
  }
  