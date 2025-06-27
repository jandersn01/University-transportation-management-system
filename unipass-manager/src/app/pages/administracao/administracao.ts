import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'
import { EstudantesService } from '../../services/estudantes';

export interface TurnoOption {
  value: string;
  label: string;
}

export interface UniversidadeOption {
  value: string;
  label: string;
  campus: string[];
}

@Component({
  selector: 'app-administracao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administracao.html',
  styleUrl: './administracao.css'
})
export class Administracao {
  private formBuilder = inject(FormBuilder);
  private estudanteService = inject(EstudantesService);

  // Signals para gerenciar estado
  mensagem = signal<string>('');
  loading = signal<boolean>(false);
  formSubmitted = signal<boolean>(false);

  // Dados dinâmicos com signals
  turnos = signal<TurnoOption[]>([
    { value: 'Manhã', label: 'Manhã (06:00 - 12:00)' },
    { value: 'Tarde', label: 'Tarde (12:00 - 18:00)' },
    { value: 'Noite', label: 'Noite (18:00 - 22:00)' },
    { value: 'Integral', label: 'Integral (06:00 - 22:00)' }
  ]);

  universidades = signal<UniversidadeOption[]>([
    { value: 'Universidade Federal da Paraíba (UFPB)', label: 'Universidade Federal da Paraíba (UFPB)', campus: ['Campus I - João Pessoa', 'Campus II - Areia', 'Campus III - Bananeiras', 'Campus IV - Mamanguape'] },
    { value: 'Universidade Estadual da Paraíba (UEPB)', label: 'Universidade Estadual da Paraíba (UEPB)', campus: ['Campus I - Campina Grande', 'Campus II - Lagoa Seca', 'Campus III - Guarabira', 'Campus IV - Catolé do Rocha'] },
    { value: 'Instituto Federal da Paraíba (IFPB)', label: 'Instituto Federal da Paraíba (IFPB)', campus: ['Campus João Pessoa', 'Campus Campina Grande', 'Campus Cajazeiras', 'Campus Sousa'] },
    { value: 'Universidade Federal de Pernambuco (UFPE)', label: 'Universidade Federal de Pernambuco (UFPE)', campus: ['Campus Recife', 'Campus Caruaru', 'Campus Vitória'] },
    { value: 'Universidade de Pernambuco (UPE)', label: 'Universidade de Pernambuco (UPE)', campus: ['Campus Benfica', 'Campus Caruaru', 'Campus Garanhuns'] }
  ]);

  universidadeSelecionada = signal<string>('');
  
  // Computed signal para campus disponíveis
  campusDisponiveis = computed(() => {
    const universidade = this.universidades().find(u => u.value === this.universidadeSelecionada());
    return universidade ? universidade.campus : [];
  });

  // Computed signal para verificar se a mensagem é de sucesso
  isSuccessMessage = computed(() => this.mensagem().includes('sucesso'));

  cadastroForm: FormGroup;

  constructor(){
    this.cadastroForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      rg: ['', [Validators.required, Validators.minLength(7)]],
      dataNascimento: ['', Validators.required],
      universidade: ['', Validators.required],
      campus: ['', Validators.required],
      turno: ['', Validators.required],
      previsaoConclusao: ['', Validators.required],
      declaracaoVinculoUrl: ['', Validators.required],
      comprovanteResidenciaUrl: ['', Validators.required]
    });

    // Observar mudanças na universidade
    this.cadastroForm.get('universidade')?.valueChanges.subscribe(value => {
      this.universidadeSelecionada.set(value);
      this.cadastroForm.get('campus')?.setValue(''); // Limpar campus quando universidade muda
    });
  }

  onSubmit(): void {
    this.formSubmitted.set(true);
    this.mensagem.set('');

    if (this.cadastroForm.valid) {
      this.loading.set(true);
      
      this.estudanteService.cadastrar(this.cadastroForm.value).subscribe({
        next: () => {
          this.mensagem.set('Estudante cadastrado com sucesso!');
          this.cadastroForm.reset();
          this.formSubmitted.set(false);
          this.universidadeSelecionada.set('');
          this.loading.set(false);
        },
        error: (err) => {
          this.mensagem.set('Erro ao cadastrar estudante. Tente novamente.');
          this.loading.set(false);
          console.error(err);
        }
      });
    } else {
      this.mensagem.set('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  limparFormulario(): void {
    this.cadastroForm.reset();
    this.mensagem.set('');
    this.formSubmitted.set(false);
    this.universidadeSelecionada.set('');
  }

  // Método para verificar se um campo específico tem erro
  isFieldInvalid(fieldName: string): boolean {
    const field = this.cadastroForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.formSubmitted()));
  }

  // Método para obter mensagem de erro de um campo
  getFieldError(fieldName: string): string {
    const field = this.cadastroForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['pattern']) return 'Formato inválido';
      if (field.errors['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
