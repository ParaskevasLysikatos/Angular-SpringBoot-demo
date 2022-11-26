import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCompanyComponent } from './preview-company.component';

describe('PreviewCompanyComponent', () => {
  let component: PreviewCompanyComponent;
  let fixture: ComponentFixture<PreviewCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
