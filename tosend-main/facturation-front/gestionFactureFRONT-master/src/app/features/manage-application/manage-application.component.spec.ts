import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApplicationComponent } from './manage-application.component';

describe('ManageApplicationComponent', () => {
  let component: ManageApplicationComponent;
  let fixture: ComponentFixture<ManageApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageApplicationComponent]
    });
    fixture = TestBed.createComponent(ManageApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
