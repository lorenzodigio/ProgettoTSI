export class Pratica {
    id:number;
    nomePratica: string;
    inizioPratica: string;
    finePratica: string;
    incorso: number;
    fk_id_vettura: number;
    fk_id_persona_pratica: number;
  
    constructor() {
      this.id = 0;
      this.nomePratica = '';
      this.inizioPratica = '';
      this.finePratica = '';
      this.incorso = 1;
      this.fk_id_vettura = 0;
      this.fk_id_persona_pratica = 0;
    }
  }
  