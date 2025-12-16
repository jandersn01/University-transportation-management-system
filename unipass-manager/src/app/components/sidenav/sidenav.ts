import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para ngClass e @if
import { RouterModule } from '@angular/router';
import { navaBarData, INavbarData } from '../../data/nav-data'; // Certifique-se de importar a interface

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class Sidenav {
  @Output() onToggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter();
  
  collapsed = false; // false = Fechado, true = Aberto (Sua lógica original)
  screenWidth = 0;
  navData = navaBarData;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  // --- NOVA FUNÇÃO ---
  handleClick(item: INavbarData): void {
    // Se a sidebar estiver fechada (collapsed=false), abrimos ela primeiro
    if (!this.collapsed) {
        this.collapsed = true;
        this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
    // Alterna o submenu
    item.expanded = !item.expanded;
  }
}