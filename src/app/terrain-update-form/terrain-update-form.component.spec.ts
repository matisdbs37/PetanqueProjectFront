import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainUpdateFormComponent } from './terrain-update-form.component';

describe('TerrainUpdateFormComponent', () => {
  let component: TerrainUpdateFormComponent;
  let fixture: ComponentFixture<TerrainUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerrainUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
