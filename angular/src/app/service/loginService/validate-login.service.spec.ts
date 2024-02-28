import { TestBed } from '@angular/core/testing';

import { ValidateLoginService } from './validate-login.service';

describe('ValidateLoginService', () => {
  let service: ValidateLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
