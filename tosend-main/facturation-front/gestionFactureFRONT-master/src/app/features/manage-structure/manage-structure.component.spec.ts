import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStructureComponent } from './manage-structure.component';

describe('ManageStructureComponent', () => {
  let component: ManageStructureComponent;
  let fixture: ComponentFixture<ManageStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStructureComponent]
    });
    fixture = TestBed.createComponent(ManageStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
