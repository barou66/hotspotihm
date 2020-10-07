import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodeTempComponent } from './add-code-temp.component';

describe('AddCodeTempComponent', () => {
  let component: AddCodeTempComponent;
  let fixture: ComponentFixture<AddCodeTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCodeTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCodeTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
