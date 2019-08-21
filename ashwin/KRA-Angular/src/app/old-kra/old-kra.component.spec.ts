import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldKraComponent } from './old-kra.component';

describe('OldKraComponent', () => {
  let component: OldKraComponent;
  let fixture: ComponentFixture<OldKraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldKraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldKraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
