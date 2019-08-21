import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KraHomeComponent } from './kra-home.component';

describe('KraHomeComponent', () => {
  let component: KraHomeComponent;
  let fixture: ComponentFixture<KraHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KraHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KraHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
