import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudantesService, Estudante, EstudanteListDTO } from '../../../services/estudantes';

export interface EstudanteAtivo extends EstudanteListDTO {
  frequencia: number;
  faltasNaoJustificadas: number;
  ultimaViagem: string;
  statusBeneficio: 'ATIVO' | 'REVOGADO';
}

export interface EstatisticasGerenciamento {
  ativos: number;
  revogados: number;
  total: number;
  mediaBeneficiario: number;
}

export interface HistoricoViagem {
  id: number;
  estudanteId: number;
  data: string;
  rota: string;
  tipoViagem: 'IDA' | 'VOLTA' | 'IDA_VOLTA';
  compareceu: boolean;
}

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciamento.html',
  styleUrl: './gerenciamento.css'
})
export class Gerenciamento implements OnInit {


  private estudantesService = inject(EstudantesService);

  // Signals para dados
  estudantesAtivos = signal<EstudanteAtivo[]>([]);
  estudanteSelecionado = signal<Estudante | null>(null);
  historicoViagens = signal<HistoricoViagem[]>([]);
  
  // Signals para estados
  loading = signal<boolean>(false);
  loadingDetalhes = signal<boolean>(false);
  loadingHistorico = signal<boolean>(false);
  error = signal<string | null>(null);

  // Signals para filtros
  filtroStatus = signal<string>('');
  filtroUniversidade = signal<string>('');
  termoBusca = signal<string>('');
  filtroFrequencia = signal<string>(''); // BAIXA, MEDIA, ALTA

  // Signals para modais
  modalDetalhesAberto = signal(false);
  modalHistoricoAberto = signal(false);
  modalRevogarAberto = signal(false);
  modalAlterarDadosAberto = signal(false);
  
  // Signals para ações
  justificativaRevogacao = signal<string>('');
  motivoRevogacao = signal<string>('');

  // Computed para estatísticas
  estatisticas = computed((): EstatisticasGerenciamento => {
    const estudantes = this.estudantesAtivos();
    const ativos = estudantes.filter(e => e.statusBeneficio === 'ATIVO').length;
    const revogados = estudantes.filter(e => e.statusBeneficio === 'REVOGADO').length;
    const mediaFreq = estudantes.length > 0 
      ? estudantes.reduce((acc, e) => acc + e.frequencia, 0) / estudantes.length 
      : 0;

    return {
      ativos,
      revogados,
      total: estudantes.length,
      mediaBeneficiario: Math.round(mediaFreq * 100) / 100
    };
  });

  // Computed para filtros
  estudantesFiltrados = computed(() => {
    let estudantes = this.estudantesAtivos();

    // Filtro por status do benefício
    if (this.filtroStatus()) {
      estudantes = estudantes.filter(e => e.statusBeneficio === this.filtroStatus());
    }

    // Filtro por universidade
    if (this.filtroUniversidade()) {
      estudantes = estudantes.filter(e => 
        e.universidade.toLowerCase().includes(this.filtroUniversidade().toLowerCase())
      );
    }

    // Filtro por busca (nome/CPF)
    if (this.termoBusca()) {
      const termo = this.termoBusca().toLowerCase();
      estudantes = estudantes.filter(e => 
        e.nomeCompleto.toLowerCase().includes(termo) ||
        e.cpf.includes(termo)
      );
    }

    // Filtro por frequência
    if (this.filtroFrequencia()) {
      const filtro = this.filtroFrequencia();
      estudantes = estudantes.filter(e => {
        if (filtro === 'BAIXA') return e.frequencia < 0.4;
        if (filtro === 'MEDIA') return e.frequencia >= 0.4 && e.frequencia < 0.7;
        if (filtro === 'ALTA') return e.frequencia >= 0.7;
        return true;
      });
    }

    return estudantes;
  });

  ngOnInit(): void {
    this.carregarEstudantesAtivos();
  }

  // Carregamento de dados
  carregarEstudantesAtivos(): void {
    this.loading.set(true);
    this.error.set(null);
    
    // Busca apenas estudantes aprovados via query parameter
    this.estudantesService.getEstudantesAprovados().subscribe({
      next: (estudantes) => {
        // Transforma para incluir dados de gerenciamento
        const estudantesAtivos = estudantes.map(e => this.transformarParaEstudanteAtivo(e));
        
        this.estudantesAtivos.set(estudantesAtivos);
        this.loading.set(false);
      },
      error: (erro) => {
        this.error.set('Erro ao carregar estudantes ativos: ' + erro.message);
        this.loading.set(false);
      }
    });
  }

  private transformarParaEstudanteAtivo(estudante: EstudanteListDTO): EstudanteAtivo {
    return {
      ...estudante,
      frequencia: Math.random() * 0.9 + 0.1, // Simula frequência entre 10% e 100%
      faltasNaoJustificadas: Math.floor(Math.random() * 5), // 0-4 faltas
      ultimaViagem: this.gerarDataAleatoria(),
      statusBeneficio: 'ATIVO'
    };
  }

  private gerarDataAleatoria(): string {
    const hoje = new Date();
    const diasAtras = Math.floor(Math.random() * 30);
    const data = new Date(hoje.getTime() - diasAtras * 24 * 60 * 60 * 1000);
    return data.toLocaleDateString('pt-BR');
  }

  // Métodos para ações
  verDetalhes(id: number): void {
    this.loadingDetalhes.set(true);
    
    this.estudantesService.getEstudantePorId(id).subscribe({
      next: (estudante) => {
        this.estudanteSelecionado.set(estudante);
        this.modalDetalhesAberto.set(true);
        this.loadingDetalhes.set(false);
      },
      error: (erro) => {
        this.error.set('Erro ao carregar detalhes: ' + erro.message);
        this.loadingDetalhes.set(false);
      }
    });
  }

  verHistoricoViagens(estudanteId: number): void {
    this.loadingHistorico.set(true);
    
    // Simulação - na implementação real, seria um endpoint específico
    setTimeout(() => {
      const historico: HistoricoViagem[] = this.gerarHistoricoSimulado(estudanteId);
      this.historicoViagens.set(historico);
      this.modalHistoricoAberto.set(true);
      this.loadingHistorico.set(false);
    }, 500);
  }

  private gerarHistoricoSimulado(estudanteId: number): HistoricoViagem[] {
    const historico: HistoricoViagem[] = [];
    for (let i = 0; i < 10; i++) {
      historico.push({
        id: i + 1,
        estudanteId,
        data: this.gerarDataAleatoria(),
        rota: `Rota ${Math.floor(Math.random() * 5) + 1}`,
        tipoViagem: ['IDA', 'VOLTA', 'IDA_VOLTA'][Math.floor(Math.random() * 3)] as any,
        compareceu: Math.random() > 0.15 // 85% de comparecimento
      });
    }
    return historico.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }


  abrirModalRevogacao(id: number): void {

    this.justificativaRevogacao.set('');
    this.motivoRevogacao.set('');
    this.modalRevogarAberto.set(true);

    // carrega os detalhes completos
    this.estudantesService.getEstudantePorId(id).subscribe({
      next: (detalhes: Estudante) => {
        this.estudanteSelecionado.set(detalhes);
      },
      error: (err: any) => {
        console.error("Erro ao buscar detalhes do estudante", err);
      }
    });
  }

  confirmarRevogacao() {
    const estudante = this.estudanteSelecionado();
    if (!estudante) return;
  
    this.estudantesService.revogarEstudante({
      id: estudante.id,
      motivo: this.motivoRevogacao(),
      justificativa: this.justificativaRevogacao()
    }).subscribe({
      next: () => {
        this.fecharModalRevogacao();
        this.recarregarDados(); // atualiza a lista após remoção
      },
      error: (err) => {
        console.error("Erro ao revogar estudante", err);
      }
    });
  }

  exportarRelatorio(): void {
    // RF017 - Implementar exportação de relatórios
    const dados = this.estudantesFiltrados();
    const csv = this.converterParaCSV(dados);
    this.downloadCSV(csv, 'relatorio_estudantes_ativos.csv');
  }

  private converterParaCSV(dados: EstudanteAtivo[]): string {
    const headers = ['Nome', 'CPF', 'Universidade', 'Campus', 'Status', 'Frequência', 'Faltas', 'Última Viagem'];
    const rows = dados.map(e => [
      e.nomeCompleto,
      e.cpf,
      e.universidade,
      e.campus,
      e.statusBeneficio,
      (e.frequencia * 100).toFixed(1) + '%',
      e.faltasNaoJustificadas.toString(),
      e.ultimaViagem
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Métodos para filtros
  atualizarFiltroStatus(status: string): void {
    this.filtroStatus.set(status);
  }

  atualizarFiltroUniversidade(universidade: string): void {
    this.filtroUniversidade.set(universidade);
  }

  atualizarFiltroFrequencia(frequencia: string): void {
    this.filtroFrequencia.set(frequencia);
  }

  atualizarTermoBusca(termo: string): void {
    this.termoBusca.set(termo);
  }

  limparFiltros(): void {
    this.filtroStatus.set('');
    this.filtroUniversidade.set('');
    this.filtroFrequencia.set('');
    this.termoBusca.set('');
  }

  // Métodos para modais
  fecharModalDetalhes(): void {
    this.modalDetalhesAberto.set(false);
    this.estudanteSelecionado.set(null);
  }

  fecharModalHistorico(): void {
    this.modalHistoricoAberto.set(false);
    this.historicoViagens.set([]);
  }

  fecharModalRevogacao(): void {
    this.modalRevogarAberto.set(false);
    this.estudanteSelecionado.set(null);
    this.justificativaRevogacao.set('');
    this.motivoRevogacao.set('');
  }

  recarregarDados(): void {
    this.carregarEstudantesAtivos();
  }

  // Método utilitário para formatação de frequência
  formatarFrequencia(frequencia: number): string {
    return (frequencia * 100).toFixed(1) + '%';
  }

  // Método para classificar frequência
  classificarFrequencia(frequencia: number): string {
    if (frequencia >= 0.7) return 'ALTA';
    if (frequencia >= 0.4) return 'MEDIA';
    return 'BAIXA';
  }
}