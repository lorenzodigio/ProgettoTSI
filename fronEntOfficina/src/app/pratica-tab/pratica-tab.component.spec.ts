import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticaTabComponent } from './pratica-tab.component';

describe('PraticaTabComponent', () => {
  let component: PraticaTabComponent;
  let fixture: ComponentFixture<PraticaTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PraticaTabComponent]
    });
    fixture = TestBed.createComponent(PraticaTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
