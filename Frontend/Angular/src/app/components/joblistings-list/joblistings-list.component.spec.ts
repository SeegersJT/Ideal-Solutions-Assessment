import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistingsListComponent } from './joblistings-list.component';

describe('JoblistingsListComponent', () => {
  let component: JoblistingsListComponent;
  let fixture: ComponentFixture<JoblistingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoblistingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
