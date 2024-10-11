import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IssueSectionComponent} from './issue-section.component';

xdescribe('IssueSectionComponent', () => {
  let component: IssueSectionComponent;
  let fixture: ComponentFixture<IssueSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueSectionComponent],
    })
        .compileComponents();

    fixture = TestBed.createComponent(IssueSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
