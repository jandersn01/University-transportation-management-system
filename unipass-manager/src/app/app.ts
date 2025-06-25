import { Component, inject, OnInit } from '@angular/core';
import { Sidenav } from './components/sidenav/sidenav';
import { Body } from './body/body';
import { LayoutService, SidenavToggle } from './services/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidenav, Body],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'unipass-manager';

  // Injeção do serviço usando inject() - forma mais moderna
  protected layoutService = inject(LayoutService);

  // Signals do serviço disponíveis diretamente
  collapsed = this.layoutService.collapsed;
  screenWidth = this.layoutService.screenWidth;
  bodyClass = this.layoutService.bodyClass;

  ngOnInit(): void {
    // Inicializa a largura da tela
    this.layoutService.initializeScreenWidth();
  }

  onToggleSidenav(data: SidenavToggle): void {
    // Usa o método do service para atualizar o estado
    this.layoutService.updateLayout(data);
  }
}
