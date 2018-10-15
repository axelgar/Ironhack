import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreatePageComponent } from './users-create-page.component';

describe('UsersCreatePageComponent', () => {
  let component: UsersCreatePageComponent;
  let fixture: ComponentFixture<UsersCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
