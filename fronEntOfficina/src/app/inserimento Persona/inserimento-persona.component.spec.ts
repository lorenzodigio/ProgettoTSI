import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InserimentoPersonaComponent } from './inserimento-persona.component';

describe('InserimentoPersonaComponent', () => {
  let component: InserimentoPersonaComponent;
  let fixture: ComponentFixture<InserimentoPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InserimentoPersonaComponent]
    });
    fixture = TestBed.createComponent(InserimentoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
