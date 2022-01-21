import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistingDetailsComponent } from './joblisting-details.component';

describe('JoblistingDetailsComponent', () => {
  let component: JoblistingDetailsComponent;
  let fixture: ComponentFixture<JoblistingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoblistingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
