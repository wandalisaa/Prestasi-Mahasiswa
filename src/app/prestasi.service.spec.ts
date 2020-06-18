import { TestBed } from '@angular/core/testing';

import { PrestasiService } from './prestasi.service';

describe('PrestasiService', () => {
  let service: PrestasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
