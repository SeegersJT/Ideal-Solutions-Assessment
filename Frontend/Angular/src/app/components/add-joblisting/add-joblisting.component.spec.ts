import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJoblistingComponent } from './add-joblisting.component';

describe('AddJoblistingComponent', () => {
  let component: AddJoblistingComponent;
  let fixture: ComponentFixture<AddJoblistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJoblistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJoblistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
