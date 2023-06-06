import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConventionComponent } from './manage-convention.component';

describe('ManageConventionComponent', () => {
  let component: ManageConventionComponent;
  let fixture: ComponentFixture<ManageConventionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageConventionComponent]
    });
    fixture = TestBed.createComponent(ManageConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
