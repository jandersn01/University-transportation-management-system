import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudantesService, Estudante, EstudanteListDTO } from '../../services/estudantes';

export interface SolicitacaoEstudante {
  id: number;
  cpf: string;
  nomeCompleto: string;
  rg: string;
  dataNascimento: string;
  universidade: string;
  campus: string;
  turno: string;
  previsaoConclusao: string;
  declaracaoVinculoUrl: string;
  comprovanteResidenciaUrl: string;
  status: 'pendente' | 'aprovado' | 'reprovado';
}

export interface Estatisticas {
  pendentes: number;
  aprovados: number;
  reprovados: number;
  total: number;
}

@Component({
  selector: 'app-solicitacoes-estudantis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitacoes-estudantis.html',
  styleUrl: './solicitacoes-estudantis.css'
})
export class SolicitacoesEstudantis implements OnInit {

  // Injeta o serviço de estudantes
  private estudantesService = inject(EstudantesService);

  // Signals para gerenciar dados
  solicitacoes = signal<EstudanteListDTO[]>([]);
  estudanteDetalhes = signal<Estudante | null>(null);
  loadingDetalhes = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Signals para filtros
  filtroStatus = signal<string>('');
  filtroUniversidade = signal<string>('');
  filtroData = signal<string>('');
  termoBusca = signal<string>('');

  // Signals para Modal
  modalAberto = signal(false);

  // Computed signals para cálculos
  estatisticas = computed((): Estatisticas => {
    const solicitacoes = this.solicitacoes();
    return {
      pendentes: solicitacoes.filter(s => s.statusCadastro === 'PENDENTE').length,
      aprovados: solicitacoes.filter(s => s.statusCadastro === 'APROVADO').length,
      reprovados: solicitacoes.filter(s => s.statusCadastro === 'RECUSADO').length,
      total: solicitacoes.length
    };
  });

  // Computed signal para solicitações filtradas
  solicitacoesFiltradas = computed(() => {
    let solicitacoes = this.solicitacoes();
    
    // Filtro por status
    if (this.filtroStatus()) {
      const statusMap: { [key: string]: string } = {
        'pendente': 'PENDENTE',
        'aprovado': 'APROVADO',
        'reprovado': 'RECUSADO'
      };
      const statusFiltro = statusMap[this.filtroStatus()];
      if (statusFiltro) {
        solicitacoes = solicitacoes.filter(s => s.statusCadastro === statusFiltro);
      }
    }

    // Filtro por universidade
    if (this.filtroUniversidade()) {
      solicitacoes = solicitacoes.filter(s => 
        s.universidade.toLowerCase().includes(this.filtroUniversidade().toLowerCase())
      );
    }

    // Filtro por termo de busca
    if (this.termoBusca()) {
      const termo = this.termoBusca().toLowerCase();
      solicitacoes = solicitacoes.filter(s => 
        s.nomeCompleto.toLowerCase().includes(termo) ||
        s.cpf.includes(termo)
      );
    }

    return solicitacoes;
  });

  // Métodos para atualizar filtros
  atualizarFiltroStatus(status: string): void {
    this.filtroStatus.set(status);
  }

  atualizarFiltroUniversidade(universidade: string): void {
    this.filtroUniversidade.set(universidade);
  }

  atualizarFiltroData(data: string): void {
    this.filtroData.set(data);
  }

  atualizarTermoBusca(termo: string): void {
    this.termoBusca.set(termo);
  }

  // Lifecycle hook
  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  // Método para carregar dados
  carregarSolicitacoes(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.estudantesService.getTodosEstudantes().subscribe({
      next: (dados) => {
        this.solicitacoes.set(dados);
        this.loading.set(false);
      },
      error: (erro) => {
        this.error.set('Erro ao carregar solicitações: ' + erro.message);
        this.loading.set(false);
        console.error('Erro ao carregar solicitações:', erro);
      }
    });
  }

  // Método para recarregar dados
  recarregarDados(): void {
    this.carregarSolicitacoes();
  }

  // Métodos para ações
  aprovarSolicitacao(id: number): void {
    this.estudantesService.atualizarStatus(id, 'APROVADO').subscribe({
      next: () => {
        this.solicitacoes.update(solicitacoes =>
          solicitacoes.map(s => 
            s.id === id ? { ...s, statusCadastro: 'APROVADO' } : s
          )
        );
      },
      error: (erro) => {
        this.error.set('Erro ao aprovar solicitação: ' + erro.message);
        console.error('Erro ao aprovar:', erro);
      }
    });
  }

  reprovarSolicitacao(id: number): void {
    this.estudantesService.atualizarStatus(id, 'RECUSADO').subscribe({
      next: () => {
        this.solicitacoes.update(solicitacoes =>
          solicitacoes.map(s => 
            s.id === id ? { ...s, statusCadastro: 'RECUSADO' } : s
          )
        );
      },
      error: (erro) => {
        this.error.set('Erro ao reprovar solicitação: ' + erro.message);
        console.error('Erro ao reprovar:', erro);
      }
    });
  }

  verDetalhes(id: number): void {
    this.loadingDetalhes.set(true);
    
    this.estudantesService.getEstudantePorId(id).subscribe({
      next: (estudante) => {
        this.estudanteDetalhes.set(estudante);
        this.modalAberto.set(true);
        this.loadingDetalhes.set(false);
      },
      error: (erro) => {
        this.error.set('Erro ao carregar detalhes: ' + erro.message);
        this.loadingDetalhes.set(false);
      }
    });
  }

  limparFiltros(): void {
    this.filtroStatus.set('');
    this.filtroUniversidade.set('');
    this.filtroData.set('');
    this.termoBusca.set('');
  }

  exportarRelatorio(): void {
    // ToDo
  }

  fecharModal(): void {
    this.modalAberto.set(false);
  }
}