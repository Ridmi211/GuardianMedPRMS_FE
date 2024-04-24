import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminsComponent } from './add-admins.component';

describe('AddAdminsComponent', () => {
  let component: AddAdminsComponent;
  let fixture: ComponentFixture<AddAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdminsComponent]
    });
    fixture = TestBed.createComponent(AddAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
