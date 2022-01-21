import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillmapListComponent } from './skillmap-list.component';

describe('SkillmapListComponent', () => {
  let component: SkillmapListComponent;
  let fixture: ComponentFixture<SkillmapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillmapListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillmapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
