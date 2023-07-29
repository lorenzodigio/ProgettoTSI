export class Persona {
  id:number;
  nome: string;
  cognome: string;
  email: string;
  codiceFiscale: string;
  password: string;
  ruolo: number;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.cognome = '';
    this.email = '';
    this.codiceFiscale = '';
    this.password = '';
    this.ruolo = 0;
  }
}
