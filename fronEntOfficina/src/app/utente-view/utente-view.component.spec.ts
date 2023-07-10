import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtenteViewComponent } from './utente-view.component';

describe('UtenteViewComponent', () => {
  let component: UtenteViewComponent;
  let fixture: ComponentFixture<UtenteViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtenteViewComponent]
    });
    fixture = TestBed.createComponent(UtenteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
