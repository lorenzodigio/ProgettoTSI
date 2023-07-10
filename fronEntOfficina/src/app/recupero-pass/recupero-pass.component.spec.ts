import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperoPassComponent } from './recupero-pass.component';

describe('RecuperoPassComponent', () => {
  let component: RecuperoPassComponent;
  let fixture: ComponentFixture<RecuperoPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperoPassComponent]
    });
    fixture = TestBed.createComponent(RecuperoPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
