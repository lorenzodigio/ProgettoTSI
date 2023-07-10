import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticaTabUtenteComponent } from './pratica-tab-utente.component';

describe('PraticaTabUtenteComponent', () => {
  let component: PraticaTabUtenteComponent;
  let fixture: ComponentFixture<PraticaTabUtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PraticaTabUtenteComponent]
    });
    fixture = TestBed.createComponent(PraticaTabUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
