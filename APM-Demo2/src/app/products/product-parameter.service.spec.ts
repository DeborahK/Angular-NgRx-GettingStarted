import { TestBed, inject } from '@angular/core/testing';

import { ProductParameterService } from './product-parameter.service';

describe('ProductParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductParameterService]
    });
  });

  it('should be created', inject([ProductParameterService], (service: ProductParameterService) => {
    expect(service).toBeTruthy();
  }));
});
