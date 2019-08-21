import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KraRowComponent } from './kra-row.component';

describe('KraRowComponent', () => {
  let component: KraRowComponent;
  let fixture: ComponentFixture<KraRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KraRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KraRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
