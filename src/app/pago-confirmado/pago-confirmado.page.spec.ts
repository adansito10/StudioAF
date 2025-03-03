import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoConfirmadoPage } from './pago-confirmado.page';

describe('PagoConfirmadoPage', () => {
  let component: PagoConfirmadoPage;
  let fixture: ComponentFixture<PagoConfirmadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoConfirmadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
