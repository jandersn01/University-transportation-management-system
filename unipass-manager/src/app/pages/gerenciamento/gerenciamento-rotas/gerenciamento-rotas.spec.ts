import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoRotas } from './gerenciamento-rotas';

describe('GerenciamentoRotas', () => {
  let component: GerenciamentoRotas;
  let fixture: ComponentFixture<GerenciamentoRotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciamentoRotas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciamentoRotas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
