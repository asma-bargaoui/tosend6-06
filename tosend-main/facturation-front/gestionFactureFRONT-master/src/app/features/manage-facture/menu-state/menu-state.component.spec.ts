import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStateComponent } from './menu-state.component';

describe('MenuStateComponent', () => {
  let component: MenuStateComponent;
  let fixture: ComponentFixture<MenuStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuStateComponent]
    });
    fixture = TestBed.createComponent(MenuStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
