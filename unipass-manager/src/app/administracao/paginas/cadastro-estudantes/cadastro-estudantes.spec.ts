import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEstudantes } from './cadastro-estudantes';

describe('CadastroEstudantes', () => {
  let component: CadastroEstudantes;
  let fixture: ComponentFixture<CadastroEstudantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEstudantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEstudantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
