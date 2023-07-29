import { Pratica } from './pratica.model';
import { Vettura } from './vettura.model';
import { Persona } from './persona.model';

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
