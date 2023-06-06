import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFactureComponent } from './manage-facture.component';

describe('ManageFactureComponent', () => {
  let component: ManageFactureComponent;
  let fixture: ComponentFixture<ManageFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFactureComponent]
    });
    fixture = TestBed.createComponent(ManageFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
