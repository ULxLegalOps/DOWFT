import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataopsComponent } from './dataops.component';

describe('DataopsComponent', () => {
  let component: DataopsComponent;
  let fixture: ComponentFixture<DataopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
