export interface EstatisticaDiaria {
  periodo: string;
  quantidade: number;
  data: string;
  icon?: string;
  cor?: string;
}

export const estatisticasData: EstatisticaDiaria[] = [
  { 
    periodo: 'Manhã', 
    quantidade: 219, 
    data: '02/06',
    icon: 'fal fa-sun',
    cor: '#FFD700'
  },
  { 
    periodo: 'Tarde', 
    quantidade: 219, 
    data: '02/06',
    icon: 'fal fa-sun-cloud',
    cor: '#FF8C00'
  },
  { 
    periodo: 'Noite', 
    quantidade: 219, 
    data: '02/06',
    icon: 'fal fa-moon',
    cor: '#4169E1'
  }
]; 