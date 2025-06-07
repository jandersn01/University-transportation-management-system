import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidenav } from './sidenav/sidenav';
import { Body } from './body/body';

interface SidenavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidenav, Body],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'unipass-manager';

  isSidenavCollapsed = false;
  screenWidth = 0;

  onToggleSidenav(data: SidenavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }

}
