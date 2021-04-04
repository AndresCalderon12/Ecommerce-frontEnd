import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaProductosComponent } from './tienda-productos.component';

describe('TiendaProductosComponent', () => {
  let component: TiendaProductosComponent;
  let fixture: ComponentFixture<TiendaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
