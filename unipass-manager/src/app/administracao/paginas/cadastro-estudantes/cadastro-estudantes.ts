import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'
import { EstudantesService } from '../../../services/estudantes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro-estudantes',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro-estudantes.html',
  styleUrl: './cadastro-estudantes.css'
})
export class CadastroEstudantes {
  private formerbuilder = inject(FormBuilder);
  private estudanteService = inject(EstudantesService);

  cadastroForm: FormGroup;
  mensagem: string = '';

  constructor(){
    this.cadastroForm = this.formerbuilder.group(
      {
          cpf: ['', Validators.required],
          nomeCompleto: ['', Validators.required],
          rg: ['', Validators.required],
          dataNascimento: ['', Validators.required],
          universidade: ['', Validators.required],
          campus: ['', Validators.required],
          turno: ['', Validators.required],
          previsaoConclusao: ['', Validators.required],
          declaracaoVinculoUrl: ['path/declaracao.pdf', Validators.required],
          comprovanteResidenciaUrl: ['path/residencia.pdf', Validators.required]

      }
    )
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.estudanteService.cadastrar(this.cadastroForm.value).subscribe({
        next: () => {
          this.mensagem = 'Cadastro enviado com sucesso! Aguarde a aprovação.';
          this.cadastroForm.reset();
        },
        error: (err) => {
          this.mensagem = 'Erro ao enviar cadastro. Tente novamente.';
          console.error(err);
        }
      });
    }
  }
}
