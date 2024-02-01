import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesComponentComponent } from './reportes-component.component';

describe('ReportesComponentComponent', () => {
  let component: ReportesComponentComponent;
  let fixture: ComponentFixture<ReportesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
