import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticaComponent } from './pratica.component';

describe('PraticaComponent', () => {
  let component: PraticaComponent;
  let fixture: ComponentFixture<PraticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PraticaComponent]
    });
    fixture = TestBed.createComponent(PraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
