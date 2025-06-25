# Arquivos de Dados do Dashboard

Esta pasta contém os arquivos de configuração e dados para o dashboard do sistema.

## Estrutura dos Arquivos

### `estatisticas-data.ts`
Contém as estatísticas diárias exibidas no dashboard principal.

**Estrutura da interface `EstatisticaDiaria`:**
```typescript
{
  periodo: string;        // Nome do período (ex: 'Manhã', 'Tarde', 'Noite')
  quantidade: number;     // Quantidade de alunos
  data: string;          // Data no formato 'DD/MM'
  icon?: string;         // Ícone FontAwesome (opcional)
  cor?: string;          // Cor em hexadecimal (opcional)
}
```

### `dashboard-config.ts`
Configurações gerais do dashboard e funções utilitárias.

**Funcionalidades:**
- Configuração de título e subtítulo
- Controle de visibilidade das seções (estatísticas, mapa, calendário)
- Função para criar novas estatísticas

## Como Usar

### Adicionando Nova Estatística

1. **Manualmente no arquivo:**
```typescript
// estatisticas-data.ts
export const estatisticasData: EstatisticaDiaria[] = [
  // ... estatísticas existentes
  { 
    periodo: 'Vespertino', 
    quantidade: 145, 
    data: '03/06',
    icon: 'fal fa-sun-haze',
    cor: '#e67e22'
  }
];
```

2. **Usando a função helper:**
```typescript
// No componente
import { criarNovaEstatistica } from '../data/dashboard-config';

// Criar nova estatística
const novaEstat = criarNovaEstatistica('Vespertino', 145, 'fal fa-sun-haze', '#e67e22');
this.adicionarEstatistica(novaEstat);
```

### Configurando o Dashboard

```typescript
// dashboard-config.ts
export const dashboardConfig: DashboardConfig = {
  titulo: 'Painel de Controle',
  subtitulo: 'Sistema de Transporte',
  estatisticasAtivas: true,  // Mostrar seção de estatísticas
  mapaAtivo: true,          // Mostrar seção do mapa
  calendarAtivo: false      // Ocultar calendário
};
```

## Ícones Recomendados

- **Manhã:** `fal fa-sun` (sol)
- **Tarde:** `fal fa-sun-cloud` (sol com nuvem)
- **Noite:** `fal fa-moon` (lua)
- **Total:** `fal fa-users` (usuários)
- **Geral:** `fal fa-chart-bar` (gráfico)

## Cores Sugeridas

- **Manhã:** `#FFD700` (dourado)
- **Tarde:** `#FF8C00` (laranja escuro)
- **Noite:** `#4169E1` (azul royal)
- **Total:** `#34495e` (cinza escuro)
- **Neutro:** `#3498db` (azul padrão) 