import { TestBed, inject } from '@angular/core/testing';

import { NameGeneratorsService } from './name-generators.service';

describe('NameGeneratorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NameGeneratorsService]
    });
  });

  it('should be created', inject([NameGeneratorsService], (service: NameGeneratorsService) => {
    expect(service).toBeTruthy();
  }));
});
