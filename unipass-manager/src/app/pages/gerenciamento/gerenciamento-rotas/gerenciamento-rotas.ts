import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// --- Interfaces (Modelos de Dados) ---

export type Turno = 'MANHA' | 'TARDE' | 'NOITE';

export interface Rota {
  id: number;
  nome: string;
  turno: Turno;
  universidades: string[];
}

// Interface para o formulário (sem ID, pois na criação ainda não existe)
export interface RotaForm {
  id?: number; // Opcional, existe apenas na edição
  nome: string;
  turno: Turno;
  universidades: string[];
}

export interface EstatisticasRotas {
  total: number;
  manha: number;
  tarde: number;
  noite: number;
}

@Component({
  selector: 'app-gerenciamento-rotas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciamento-rotas.html',
  styleUrl: './gerenciamento-rotas.css' // Corrigi para .css conforme seu padrão
})
export class GerenciamentoRotas implements OnInit {

  // --- Constantes de Domínio ---
  readonly listaUniversidades = ['UFPB', 'UEPB', 'IFPB', 'UNIPE', 'FPB', 'Maurício de Nassau'];

  // --- Signals de Dados (Estado) ---
  rotas = signal<Rota[]>([]);
  
  // Rota selecionada na tabela (para destacar no mapa ou editar)
  rotaSelecionada = signal<Rota | null>(null);
  
  // Rota temporária para exclusão
  rotaParaExcluir = signal<Rota | null>(null);

  // --- Signals de Estado da UI ---
  loading = signal<boolean>(false);
  editando = signal<boolean>(false); // false = Criando, true = Editando

  // --- Signals dos Modais ---
  modalFormularioAberto = signal(false);
  modalExclusaoAberto = signal(false);

  // --- Signals do Formulário ---
  // Inicializamos com um estado vazio padrão
  formRota = signal<RotaForm>({ 
    nome: '', 
    turno: 'MANHA', 
    universidades: [] 
  });

  // --- Signals de Filtros ---
  filtroTurno = signal<string>('');
  filtroUniversidade = signal<string>('');
  termoBusca = signal<string>('');

  // --- Computed: Estatísticas em Tempo Real ---
  estatisticas = computed((): EstatisticasRotas => {
    const lista = this.rotas();
    return {
      total: lista.length,
      manha: lista.filter(r => r.turno === 'MANHA').length,
      tarde: lista.filter(r => r.turno === 'TARDE').length,
      noite: lista.filter(r => r.turno === 'NOITE').length
    };
  });

  // --- Computed: Listagem Filtrada ---
  rotasFiltradas = computed(() => {
    let lista = this.rotas();

    // 1. Filtro de Turno
    if (this.filtroTurno()) {
      lista = lista.filter(r => r.turno === this.filtroTurno());
    }

    // 2. Filtro de Universidade
    if (this.filtroUniversidade()) {
      const uni = this.filtroUniversidade();
      lista = lista.filter(r => r.universidades.includes(uni));
    }

    // 3. Filtro de Busca (Nome)
    if (this.termoBusca()) {
      const termo = this.termoBusca().toLowerCase();
      lista = lista.filter(r => r.nome.toLowerCase().includes(termo));
    }

    return lista;
  });

  // --- Ciclo de Vida ---
  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  // --- Métodos de Carga (Simulação de Backend) ---
  carregarDadosIniciais(): void {
    this.loading.set(true);
    
    // Simulando delay de rede
    setTimeout(() => {
      const dadosMock: Rota[] = [
        { id: 1, nome: 'Circular Bancários / UFPB', turno: 'MANHA', universidades: ['UFPB', 'UNIPE'] },
        { id: 2, nome: 'Integração Centro / IFPB', turno: 'TARDE', universidades: ['IFPB'] },
        { id: 3, nome: 'Rota Zona Sul / UEPB', turno: 'NOITE', universidades: ['UEPB', 'Maurício de Nassau'] },
        { id: 4, nome: 'Expresso Valentina', turno: 'MANHA', universidades: ['UFPB', 'IFPB'] },
        { id: 5, nome: 'Interbairros / UNIPE', turno: 'NOITE', universidades: ['UNIPE', 'FPB'] },
      ];
      
      this.rotas.set(dadosMock);
      this.loading.set(false);
    }, 800);
  }

  // --- Métodos de Interação da Tabela ---
  selecionarRota(rota: Rota): void {
    // Se clicar na mesma, deseleciona. Se for outra, seleciona.
    if (this.rotaSelecionada()?.id === rota.id) {
      this.rotaSelecionada.set(null);
    } else {
      this.rotaSelecionada.set(rota);
    }
  }

  // --- Métodos do Formulário (CRUD) ---
  
  abrirModalCriacao(): void {
    this.editando.set(false);
    this.resetarFormulario();
    this.modalFormularioAberto.set(true);
  }

  editarRota(rota: Rota): void {
    this.editando.set(true);
    // Clona o objeto para não alterar a tabela em tempo real antes de salvar
    this.formRota.set({
      id: rota.id,
      nome: rota.nome,
      turno: rota.turno,
      universidades: [...rota.universidades]
    });
    this.modalFormularioAberto.set(true);
  }

  salvarRota(event: Event): void {
    event.preventDefault();
    
    const formValues = this.formRota();
    
    // Validação simples
    if (!formValues.nome || formValues.universidades.length === 0) {
      alert('Preencha o nome e selecione pelo menos uma universidade.');
      return;
    }

    this.loading.set(true);

    // Simulação de salvamento no backend
    setTimeout(() => {
      if (this.editando()) {
        // Atualizar rota existente
        this.rotas.update(rotas => 
          rotas.map(r => r.id === formValues.id ? { ...formValues } as Rota : r)
        );
      } else {
        // Criar nova rota (Gera ID aleatório)
        const novaRota: Rota = {
          id: Math.floor(Math.random() * 10000),
          nome: formValues.nome,
          turno: formValues.turno,
          universidades: formValues.universidades
        };
        this.rotas.update(rotas => [novaRota, ...rotas]);
      }

      this.loading.set(false);
      this.fecharModalFormulario();
    }, 500);
  }

  // Manipulação dos Checkboxes no Formulário
  toggleUniversidadeForm(uni: string): void {
    const formAtual = this.formRota();
    const universidades = [...formAtual.universidades];
    const index = universidades.indexOf(uni);

    if (index > -1) {
      universidades.splice(index, 1); // Remove
    } else {
      universidades.push(uni); // Adiciona
    }

    // Atualiza o signal do form mantendo os outros campos
    this.formRota.set({ ...formAtual, universidades });
  }

  // Atualização genérica de campos de texto/select
  atualizarForm(campo: keyof RotaForm, valor: any): void {
    this.formRota.update(f => ({ ...f, [campo]: valor }));
  }

  private resetarFormulario(): void {
    this.formRota.set({ nome: '', turno: 'MANHA', universidades: [] });
  }

  fecharModalFormulario(): void {
    this.modalFormularioAberto.set(false);
    this.resetarFormulario();
  }

  // --- Métodos de Exclusão ---

  abrirModalExclusao(rota: Rota): void {
    this.rotaParaExcluir.set(rota);
    this.modalExclusaoAberto.set(true);
  }

  confirmarExclusao(): void {
    const rota = this.rotaParaExcluir();
    if (!rota) return;

    this.loading.set(true);

    // Simulação de delete
    setTimeout(() => {
      this.rotas.update(rotas => rotas.filter(r => r.id !== rota.id));
      
      // Se a rota excluída estava selecionada no mapa, limpa a seleção
      if (this.rotaSelecionada()?.id === rota.id) {
        this.rotaSelecionada.set(null);
      }

      this.loading.set(false);
      this.fecharModalExclusao();
    }, 500);
  }

  fecharModalExclusao(): void {
    this.modalExclusaoAberto.set(false);
    this.rotaParaExcluir.set(null);
  }

  // --- Métodos de Filtro (View) ---
  
  atualizarFiltroTurno(valor: string): void {
    this.filtroTurno.set(valor);
    // Limpa a seleção individual se mudar o filtro global para evitar confusão visual
    this.rotaSelecionada.set(null); 
  }

  atualizarFiltroUniversidade(valor: string): void {
    this.filtroUniversidade.set(valor);
  }

  atualizarTermoBusca(valor: string): void {
    this.termoBusca.set(valor);
  }

  limparFiltros(): void {
    this.filtroTurno.set('');
    this.filtroUniversidade.set('');
    this.termoBusca.set('');
    this.rotaSelecionada.set(null);
  }
}