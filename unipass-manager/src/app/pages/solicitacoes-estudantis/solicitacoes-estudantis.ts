import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SolicitacaoEstudante {
  id: number;
  nomeEstudante: string;
  cpf: string;
  universidade: string;
  matricula: string;
  dataCadastro: string;
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
export class SolicitacoesEstudantis {
  // Signals para gerenciar dados
  solicitacoes = signal<SolicitacaoEstudante[]>([
    {
      id: 1,
      nomeEstudante: 'Maria Santos Silva',
      cpf: '123.456.789-01',
      universidade: 'UFPB - Campus I',
      matricula: '20231001234',
      dataCadastro: '05/06/2025',
      status: 'pendente'
    },
    {
      id: 2,
      nomeEstudante: 'João Pedro Oliveira',
      cpf: '987.654.321-02',
      universidade: 'UEPB - Campus III',
      matricula: '20231002345',
      dataCadastro: '04/06/2025',
      status: 'pendente'
    },
    {
      id: 3,
      nomeEstudante: 'Ana Carolina Ferreira',
      cpf: '456.789.123-03',
      universidade: 'IFPB - Campus João Pessoa',
      matricula: '20231003456',
      dataCadastro: '03/06/2025',
      status: 'aprovado'
    },
    {
      id: 4,
      nomeEstudante: 'Carlos Eduardo Lima',
      cpf: '789.123.456-04',
      universidade: 'UFPB - Campus II',
      matricula: '20231004567',
      dataCadastro: '02/06/2025',
      status: 'reprovado'
    },
    {
      id: 5,
      nomeEstudante: 'Fernanda Ribeiro Costa',
      cpf: '321.654.987-05',
      universidade: 'UEPB - Campus I',
      matricula: '20231005678',
      dataCadastro: '01/06/2025',
      status: 'pendente'
    }
  ]);

  // Signals para filtros
  filtroStatus = signal<string>('');
  filtroUniversidade = signal<string>('');
  filtroData = signal<string>('');
  termoBusca = signal<string>('');

  // Computed signals para cálculos
  estatisticas = computed((): Estatisticas => {
    const solicitacoes = this.solicitacoes();
    return {
      pendentes: solicitacoes.filter(s => s.status === 'pendente').length,
      aprovados: solicitacoes.filter(s => s.status === 'aprovado').length,
      reprovados: solicitacoes.filter(s => s.status === 'reprovado').length,
      total: solicitacoes.length
    };
  });

  // Computed signal para solicitações filtradas
  solicitacoesFiltradas = computed(() => {
    let solicitacoes = this.solicitacoes();
    
    // Filtro por status
    if (this.filtroStatus()) {
      solicitacoes = solicitacoes.filter(s => s.status === this.filtroStatus());
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
        s.nomeEstudante.toLowerCase().includes(termo) ||
        s.cpf.includes(termo) ||
        s.matricula.includes(termo)
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

  // Métodos para ações
  aprovarSolicitacao(id: number): void {
    this.solicitacoes.update(solicitacoes =>
      solicitacoes.map(s => 
        s.id === id ? { ...s, status: 'aprovado' as const } : s
      )
    );
  }

  reprovarSolicitacao(id: number): void {
    this.solicitacoes.update(solicitacoes =>
      solicitacoes.map(s => 
        s.id === id ? { ...s, status: 'reprovado' as const } : s
      )
    );
  }

  verDetalhes(id: number): void {
    console.log('Ver detalhes da solicitação:', id);
    // Implementar navegação para detalhes
  }

  limparFiltros(): void {
    this.filtroStatus.set('');
    this.filtroUniversidade.set('');
    this.filtroData.set('');
    this.termoBusca.set('');
  }

  exportarRelatorio(): void {
    console.log('Exportar relatório');
    // Implementar exportação
  }
}
