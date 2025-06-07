import { Component, Output } from '@angular/core';
import { navaBarData } from './nav-data';
import { NgClass } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EventEmitter } from '@angular/core';


interface SidenavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgClass, RouterModule, RouterOutlet],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class Sidenav {
  @Output() onToggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navaBarData

 
  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSidenav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
