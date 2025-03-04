import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenServicioPage } from './resumen-servicio.page';

describe('ResumenServicioPage', () => {
  let component: ResumenServicioPage;
  let fixture: ComponentFixture<ResumenServicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
