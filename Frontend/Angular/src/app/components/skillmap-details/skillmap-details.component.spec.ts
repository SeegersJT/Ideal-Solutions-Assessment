import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillmapDetailsComponent } from './skillmap-details.component';

describe('SkillmapDetailsComponent', () => {
  let component: SkillmapDetailsComponent;
  let fixture: ComponentFixture<SkillmapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillmapDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillmapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
