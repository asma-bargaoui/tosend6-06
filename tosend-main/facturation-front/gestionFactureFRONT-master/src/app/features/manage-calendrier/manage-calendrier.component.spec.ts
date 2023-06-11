import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCalendrierComponent } from './manage-calendrier.component';

describe('ManageConventionComponent', () => {
  let component: ManageCalendrierComponent;
  let fixture: ComponentFixture<ManageCalendrierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCalendrierComponent]
    });
    fixture = TestBed.createComponent(ManageCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
