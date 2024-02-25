/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportesServicesService } from './reportesServices.service';

describe('Service: ReportesServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportesServicesService]
    });
  });

  it('should ...', inject([ReportesServicesService], (service: ReportesServicesService) => {
    expect(service).toBeTruthy();
  }));
});
