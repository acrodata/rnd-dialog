import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RndDialogComponent } from './rnd-dialog.component';

describe('RndDialogComponent', () => {
  let component: RndDialogComponent;
  let fixture: ComponentFixture<RndDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RndDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
