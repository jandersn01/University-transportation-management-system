import { Injectable, signal, computed } from '@angular/core';

export interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // Signals para gerenciar estado
  private _collapsed = signal<boolean>(false);
  private _screenWidth = signal<number>(0);

  // Signals públicos readonly
  collapsed = this._collapsed.asReadonly();
  screenWidth = this._screenWidth.asReadonly();

  // Computed signal para calcular classe CSS do body
  bodyClass = computed(() => {
    const collapsed = this._collapsed();
    const screenWidth = this._screenWidth();
    
    if (collapsed && screenWidth > 768) {
      return 'body-trimmed';
    } else if (collapsed && screenWidth < 768 && screenWidth > 0) {
      return 'body-md-screen';
    }
    return '';
  });

  // Computed signal para verificar se é mobile
  isMobile = computed(() => this._screenWidth() < 768);

  // Computed signal para verificar se sidenav deve ser visível
  shouldShowSidenav = computed(() => {
    const collapsed = this._collapsed();
    const screenWidth = this._screenWidth();
    
    if (screenWidth < 768) {
      return !collapsed;
    }
    return true;
  });

  // Métodos para atualizar o estado
  toggleSidenav(): void {
    this._collapsed.update(collapsed => !collapsed);
  }

  setSidenavCollapsed(collapsed: boolean): void {
    this._collapsed.set(collapsed);
  }

  setScreenWidth(width: number): void {
    this._screenWidth.set(width);
  }

  updateLayout(data: SidenavToggle): void {
    this._collapsed.set(data.collapsed);
    this._screenWidth.set(data.screenWidth);
  }

  // Método para inicializar com largura da tela
  initializeScreenWidth(): void {
    if (typeof window !== 'undefined') {
      this.setScreenWidth(window.innerWidth);
    }
  }
} 