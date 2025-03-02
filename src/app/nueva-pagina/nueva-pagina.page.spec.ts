import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaPaginaPage } from './nueva-pagina.page';

describe('NuevaPaginaPage', () => {
  let component: NuevaPaginaPage;
  let fixture: ComponentFixture<NuevaPaginaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
