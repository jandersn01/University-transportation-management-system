import { TestBed } from '@angular/core/testing';

import { Estudantes } from './estudantes';

describe('Estudantes', () => {
  let service: Estudantes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Estudantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
