import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPopupComponent } from './application-popup.component';

describe('ApplicationPopupComponent', () => {
  let component: ApplicationPopupComponent;
  let fixture: ComponentFixture<ApplicationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationPopupComponent]
    });
    fixture = TestBed.createComponent(ApplicationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
