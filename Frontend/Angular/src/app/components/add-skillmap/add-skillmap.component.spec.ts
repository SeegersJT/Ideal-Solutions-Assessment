import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillmapComponent } from './add-skillmap.component';

describe('AddSkillmapComponent', () => {
  let component: AddSkillmapComponent;
  let fixture: ComponentFixture<AddSkillmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
