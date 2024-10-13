import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSidebarFeatureComponent } from './login-sidebar-feature.component';

describe('LoginSidebarFeatureComponent', () => {
  let component: LoginSidebarFeatureComponent;
  let fixture: ComponentFixture<LoginSidebarFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSidebarFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSidebarFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
