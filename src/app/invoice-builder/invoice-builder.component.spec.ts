import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBuilderComponent } from './invoice-builder.component';

describe('InvoiceBuilderComponent', () => {
  let component: InvoiceBuilderComponent;
  let fixture: ComponentFixture<InvoiceBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
