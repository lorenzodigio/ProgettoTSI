import { Pratica } from '../model/pratica.model';
import { Vettura } from '../vettura/vettura.model';
import { Persona } from '../inserimento Persona/persona.model';

export class dataModel {
  pratica: Pratica;
  vettura: Vettura;
  persona: Persona;

  constructor(pratica: Pratica, vettura: Vettura, persona: Persona) {
    this.pratica = pratica;
    this.vettura = vettura;
    this.persona = persona;
  }
}
