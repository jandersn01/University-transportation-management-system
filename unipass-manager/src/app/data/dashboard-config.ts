import { EstatisticaDiaria } from './estatisticas-data';

export interface DashboardConfig {
  titulo: string;
  subtitulo: string;
  estatisticasAtivas: boolean;
  mapaAtivo: boolean;
  calendarAtivo: boolean;
}

export interface EstatisticaTemplate {
  tipo: 'quantidade' | 'percentual' | 'tempo';
  formato: string;
  prefixo?: string;
  sufixo?: string;
}

export const dashboardConfig: DashboardConfig = {
  titulo: 'Visão Geral',
  subtitulo: 'Dashboard Principal',
  estatisticasAtivas: true,
  mapaAtivo: true,
  calendarAtivo: true
};

export const templates: Record<string, EstatisticaTemplate> = {
  quantidade: {
    tipo: 'quantidade',
    formato: '###',
    sufixo: 'alunos'
  },
  percentual: {
    tipo: 'percentual',
    formato: '##.#',
    sufixo: '%'
  },
  tempo: {
    tipo: 'tempo',
    formato: '##:##',
    prefixo: 'às '
  }
};

// Função para adicionar nova estatística ao arquivo de dados
export function criarNovaEstatistica(
  periodo: string,
  quantidade: number,
  icon: string = 'fal fa-chart-bar',
  cor: string = '#3498db'
): EstatisticaDiaria {
  return {
    periodo,
    quantidade,
    data: new Date().toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit' 
    }),
    icon,
    cor
  };
} 