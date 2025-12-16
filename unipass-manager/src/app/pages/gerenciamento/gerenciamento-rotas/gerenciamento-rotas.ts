import { Component, signal, computed, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

// Importe TUDO do serviço (Interfaces + Classe do Serviço)
import { 
  RotasService, 
  Rota, 
  RotaForm, 
  EstatisticasRotas 
} from '../../../services/rotas.service'; 
// ATENÇÃO: Confirme se o caminho '../../../services/rotas.service' está correto. 
// Se o arquivo estiver em src/app/services/rotas.service.ts e este componente em 
// src/app/pages/gerenciamento/gerenciamento-rotas/gerenciamento-rotas.ts, o caminho está ok.

@Component({
  selector: 'app-gerenciamento-rotas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciamento-rotas.html',
  styleUrl: './gerenciamento-rotas.css'
})
export class GerenciamentoRotas implements OnInit, AfterViewInit, OnDestroy {

  // Injeção de Dependência do Serviço
  private rotasService = inject(RotasService);

  // Acesso às constantes via Serviço (Getter para usar no template)
  get listaUniversidades() { return this.rotasService.listaUniversidades; }

  // --- Variáveis do Leaflet ---
  private map: L.Map | undefined;
  private currentRouteLayer: L.Polyline | undefined;
  private markersLayer: L.LayerGroup | undefined;

  // --- Ícones Personalizados (Visualização Realista) ---
  // Ícone Verde para Início/Fim (Bayeux)
  private iconInicio = L.divIcon({
    html: '<div style="background-color: #27ae60; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>',
    className: 'custom-div-icon',
    iconSize: [14, 14],
    iconAnchor: [7, 7], // Centraliza o ponto
    popupAnchor: [0, -8]
  });

  // Ícone Vermelho para Universidades
  private iconUniversidade = L.divIcon({
    html: '<div style="background-color: #c0392b; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>',
    className: 'custom-div-icon',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8]
  });

  // --- Signals de Dados (Estado) ---
  rotas = signal<Rota[]>([]);
  rotaSelecionada = signal<Rota | null>(null);
  rotaParaExcluir = signal<Rota | null>(null);

  // --- Signals de Estado da UI ---
  loading = signal<boolean>(false);
  editando = signal<boolean>(false);

  // --- Signals dos Modais ---
  modalFormularioAberto = signal(false);
  modalExclusaoAberto = signal(false);

  // --- Signals do Formulário ---
  formRota = signal<RotaForm>({ 
    nome: '', 
    turno: 'MANHA', 
    universidades: [] 
  });

  // --- Signals de Filtros ---
  filtroTurno = signal<string>('');
  filtroUniversidade = signal<string>('');
  termoBusca = signal<string>('');

  // --- Computed: Estatísticas ---
  estatisticas = computed((): EstatisticasRotas => {
    const lista = this.rotas();
    return {
      total: lista.length,
      manha: lista.filter(r => r.turno === 'MANHA').length,
      tarde: lista.filter(r => r.turno === 'TARDE').length,
      noite: lista.filter(r => r.turno === 'NOITE').length
    };
  });

  // --- Computed: Filtragem ---
  rotasFiltradas = computed(() => {
    let lista = this.rotas();

    if (this.filtroTurno()) {
      lista = lista.filter(r => r.turno === this.filtroTurno());
    }
    if (this.filtroUniversidade()) {
      const uni = this.filtroUniversidade();
      lista = lista.filter(r => r.universidades.includes(uni));
    }
    if (this.termoBusca()) {
      const termo = this.termoBusca().toLowerCase();
      lista = lista.filter(r => r.nome.toLowerCase().includes(termo));
    }
    return lista;
  });

  // --- Ciclo de Vida ---
  ngOnInit(): void {
    this.carregarDados();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  // --- Lógica do Mapa (Leaflet) ---
  private initMap(): void {
    // Centraliza em um ponto médio entre Bayeux e JP
    this.map = L.map('map').setView([-7.1249, -34.8800], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  private limparMapa(): void {
    if (this.currentRouteLayer) {
      this.currentRouteLayer.remove();
    }
    if (this.markersLayer) {
      this.markersLayer.clearLayers();
    }
    // Reseta visualização
    this.map?.setView([-7.1249, -34.8800], 13);
  }

  private desenharRotaNoMapa(rota: Rota): void {
    if (!this.map) return;
    this.limparMapa();

    // 1. Adiciona Marcadores
    if (rota.paradas) {
      rota.paradas.forEach((parada, index) => {
        // Lógica para ícones:
        // Primeiro (0) e Último = Bayeux (Ícone Verde)
        // Intermediários = Universidades (Ícone Vermelho)
        const ehInicioOuFim = index === 0 || index === rota.paradas!.length - 1;
        const iconeParaUsar = ehInicioOuFim ? this.iconInicio : this.iconUniversidade;

        L.marker(parada.coords, { icon: iconeParaUsar })
          .bindPopup(`<b>${parada.nome}</b>`)
          .addTo(this.markersLayer!);
      });
    }

    // 2. Desenha a linha da rota com ANIMAÇÃO (Classe CSS)
    if (rota.caminho && rota.caminho.length > 0) {
      this.currentRouteLayer = L.polyline(rota.caminho, {
        color: '#2980b9', // Cor da linha
        weight: 5,        // Espessura
        opacity: 0.8,
        
        // --- AQUI ESTÁ A MÁGICA DA ANIMAÇÃO ---
        className: 'flowing-dash-animation' 
        
      }).addTo(this.map);

      // Ajusta o zoom para caber a rota inteira com uma margem (padding)
      this.map.fitBounds(this.currentRouteLayer.getBounds(), { padding: [50, 50] });
    }
  }

  // --- Métodos de Dados (Consumindo Service) ---
  carregarDados(): void {
    this.loading.set(true);
    this.rotasService.getRotas().subscribe({
      next: (dados) => {
        this.rotas.set(dados);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar rotas', err);
        this.loading.set(false);
      }
    });
  }

  // --- Interações da UI ---
  selecionarRota(rota: Rota): void {
    if (this.rotaSelecionada()?.id === rota.id) {
      this.rotaSelecionada.set(null);
      this.limparMapa();
    } else {
      this.rotaSelecionada.set(rota);
      this.desenharRotaNoMapa(rota);
    }
  }

  // --- CRUD (Via Service) ---
  abrirModalCriacao(): void {
    this.editando.set(false);
    this.resetarFormulario();
    this.modalFormularioAberto.set(true);
  }

  editarRota(rota: Rota): void {
    this.editando.set(true);
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
    
    if (!formValues.nome || formValues.universidades.length === 0) {
      alert('Preencha o nome e selecione pelo menos uma universidade.');
      return;
    }

    this.loading.set(true);

    let rotaParaSalvar: Rota;

    if (this.editando()) {
      const rotaOriginal = this.rotas().find(r => r.id === formValues.id);
      // Mantém o caminho/paradas original pois o form não edita o mapa
      rotaParaSalvar = { 
        ...rotaOriginal!, 
        ...formValues 
      };
    } else {
      rotaParaSalvar = {
        id: Math.floor(Math.random() * 10000),
        nome: formValues.nome,
        turno: formValues.turno,
        universidades: formValues.universidades,
        caminho: [], // Nova rota começa vazia no mapa
        paradas: []
      };
    }

    this.rotasService.salvarRota(rotaParaSalvar).subscribe(() => {
      if (this.editando()) {
        this.rotas.update(rotas => 
          rotas.map(r => r.id === rotaParaSalvar.id ? rotaParaSalvar : r)
        );
      } else {
        this.rotas.update(rotas => [rotaParaSalvar, ...rotas]);
      }
      
      this.loading.set(false);
      this.fecharModalFormulario();
    });
  }

  // --- Exclusão (Via Service) ---
  abrirModalExclusao(rota: Rota): void {
    this.rotaParaExcluir.set(rota);
    this.modalExclusaoAberto.set(true);
  }

  confirmarExclusao(): void {
    const rota = this.rotaParaExcluir();
    if (!rota) return;

    this.loading.set(true);

    this.rotasService.excluirRota(rota.id).subscribe(() => {
      this.rotas.update(rotas => rotas.filter(r => r.id !== rota.id));
      
      if (this.rotaSelecionada()?.id === rota.id) {
        this.rotaSelecionada.set(null);
        this.limparMapa();
      }

      this.loading.set(false);
      this.fecharModalExclusao();
    });
  }

  fecharModalExclusao(): void {
    this.modalExclusaoAberto.set(false);
    this.rotaParaExcluir.set(null);
  }

  // --- Auxiliares de Formulário e Filtro ---
  toggleUniversidadeForm(uni: string): void {
    const formAtual = this.formRota();
    const universidades = [...formAtual.universidades];
    const index = universidades.indexOf(uni);

    if (index > -1) {
      universidades.splice(index, 1);
    } else {
      universidades.push(uni);
    }
    this.formRota.set({ ...formAtual, universidades });
  }

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

  atualizarFiltroTurno(valor: string): void {
    this.filtroTurno.set(valor);
    this.rotaSelecionada.set(null);
    this.limparMapa();
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
    this.limparMapa();
  }
}