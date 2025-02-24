import { TestBed } from '@angular/core/testing';

import { RndDialogService } from './rnd-dialog.service';

describe('RndDialogService', () => {
  let service: RndDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RndDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
