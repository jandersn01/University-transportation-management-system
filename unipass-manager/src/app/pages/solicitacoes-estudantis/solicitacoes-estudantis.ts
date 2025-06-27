import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudantesService, Estudante } from '../../services/estudantes';


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
  solicitacoes = signal<Estudante[]>([]);
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
      pendentes: solicitacoes.filter(s => s.statusCadastro === 'Pendente').length,
      aprovados: solicitacoes.filter(s => s.statusCadastro === 'Aprovado').length,
      reprovados: solicitacoes.filter(s => s.statusCadastro === 'Recusado').length,
      total: solicitacoes.length
    };
  });

  // Computed signal para solicitações filtradas
  solicitacoesFiltradas = computed(() => {
    let solicitacoes = this.solicitacoes();
    
    // Filtro por status
    if (this.filtroStatus()) {
      const statusMap: { [key: string]: string } = {
        'pendente': 'Pendente',
        'aprovado': 'Aprovado',
        'reprovado': 'Recusado'
      };
      const statusFiltro = statusMap[this.filtroStatus()] || this.filtroStatus();
      solicitacoes = solicitacoes.filter(s => s.statusCadastro === statusFiltro);
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

  // Método para carregar dados do json-server
  carregarSolicitacoes(): void {
    this.loading.set(true);
    this.error.set(null);
    
    // Carregar todos os estudantes para permitir filtros
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
    this.estudantesService.atualizarStatus(id, 'Aprovado').subscribe({
      next: () => {
        this.solicitacoes.update(solicitacoes =>
          solicitacoes.map(s => 
            s.id === id ? { ...s, statusCadastro: 'Aprovado' as const } : s
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
    this.estudantesService.atualizarStatus(id, 'Recusado').subscribe({
      next: () => {
        this.solicitacoes.update(solicitacoes =>
          solicitacoes.map(s => 
            s.id === id ? { ...s, statusCadastro: 'Recusado' as const } : s
          )
        );
      },
      error: (erro) => {
        this.error.set('Erro ao reprovar solicitação: ' + erro.message);
        console.error('Erro ao reprovar:', erro);
      }
    });
  }

  estudante = signal<Estudante[]>([]); // pra carregar dados no modal;
  verDetalhes(id: number): void{
    this.modalAberto.set(true);
    const estudante_unico = this.solicitacoes().filter(
      estudante => (estudante.id === id)
    )
    this.estudante.set(estudante_unico);
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
    this.modalAberto.set(false)
  }
}
