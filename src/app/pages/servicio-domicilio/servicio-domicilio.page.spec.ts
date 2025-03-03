import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicioDomicilioPage } from './servicio-domicilio.page';

describe('ServicioDomicilioPage', () => {
  let component: ServicioDomicilioPage;
  let fixture: ComponentFixture<ServicioDomicilioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
