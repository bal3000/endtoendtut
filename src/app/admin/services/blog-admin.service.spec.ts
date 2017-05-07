/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogAdminService } from './blog-admin.service';

describe('BlogAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogAdminService]
    });
  });

  it('should ...', inject([BlogAdminService], (service: BlogAdminService) => {
    expect(service).toBeTruthy();
  }));
});
