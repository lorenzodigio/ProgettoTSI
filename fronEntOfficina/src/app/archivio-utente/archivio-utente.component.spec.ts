import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivioUtenteComponent } from './archivio-utente.component';

describe('ArchivioUtenteComponent', () => {
  let component: ArchivioUtenteComponent;
  let fixture: ComponentFixture<ArchivioUtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivioUtenteComponent]
    });
    fixture = TestBed.createComponent(ArchivioUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
