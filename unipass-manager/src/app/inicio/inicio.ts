import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../components/card-component/card-component';
import { horarioData } from './horario-data';

export interface Horario {
  id: number;
  nome: string;
  descricao: string;
}

export interface EstatisticaDiaria {
  periodo: string;
  quantidade: number;
  data: string;
}

export interface Rota {
  id: number;
  nome: string;
  campus: string;
  totalAlunos: number;
  periodo: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  // Signals para dados existentes (mantendo compatibilidade)
  horarios = signal<Horario[]>(horarioData);
  selectedHorarioId = signal<number | null>(null);

  // Novos signals para o dashboard
  estatisticasDiarias = signal<EstatisticaDiaria[]>([
    { periodo: 'Manhã', quantidade: 219, data: '02/06' },
    { periodo: 'Tarde', quantidade: 219, data: '02/06' },
    { periodo: 'Noite', quantidade: 219, data: '02/06' }
  ]);

  rotas = signal<Rota[]>([
    { id: 1, nome: 'Rota Manhã - Centro', campus: 'UFPB Campus I', totalAlunos: 73, periodo: 'manhã' },
    { id: 2, nome: 'Rota Tarde - Bancários', campus: 'UEPB Campus III', totalAlunos: 85, periodo: 'tarde' },
    { id: 3, nome: 'Rota Noite - Mangabeira', campus: 'IFPB', totalAlunos: 67, periodo: 'noite' }
  ]);

  dataAtual = signal<string>(new Date().toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit' 
  }));

  filtroMapa = signal<string>('todos');

  // Computed signals
  totalGeralAlunos = computed(() => 
    this.estatisticasDiarias().reduce((total, est) => total + est.quantidade, 0)
  );

  selectedHorario = computed(() => {
    const id = this.selectedHorarioId();
    if (!id) return null;
    return this.horarios().find(h => h.id === id) || null;
  });

  totalHorarios = computed(() => this.horarios().length);

  rotasFiltradas = computed(() => {
    if (this.filtroMapa() === 'todos') return this.rotas();
    return this.rotas().filter(rota => rota.periodo === this.filtroMapa());
  });

  // Métodos existentes (mantendo compatibilidade)
  selectHorario(id: number): void {
    this.selectedHorarioId.set(id);
  }

  clearSelection(): void {
    this.selectedHorarioId.set(null);
  }

  // Novos métodos para funcionalidades do dashboard
  atualizarFiltroMapa(filtro: string): void {
    this.filtroMapa.set(filtro);
  }

  editarRota(rotaId: number): void {
    console.log('Editando rota:', rotaId);
    // Implementar navegação para edição de rota
  }

  verDetalhesCalendario(): void {
    console.log('Visualizando detalhes do calendário');
    // Implementar navegação para calendário detalhado
  }

  gerenciarRotas(): void {
    console.log('Gerenciando rotas');
    // Implementar navegação para gerenciamento de rotas
  }

  atualizarEstatisticas(): void {
    // Simular atualização de dados
    const novasEstatisticas = this.estatisticasDiarias().map(est => ({
      ...est,
      quantidade: Math.floor(Math.random() * 100) + 150
    }));
    this.estatisticasDiarias.set(novasEstatisticas);
  }

  exportarRelatorio(): void {
    console.log('Exportando relatório do dashboard');
    // Implementar exportação de relatório
  }
}
