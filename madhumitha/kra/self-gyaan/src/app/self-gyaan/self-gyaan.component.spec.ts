import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfGyaanComponent } from './self-gyaan.component';

describe('SelfGyaanComponent', () => {
  let component: SelfGyaanComponent;
  let fixture: ComponentFixture<SelfGyaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfGyaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfGyaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
