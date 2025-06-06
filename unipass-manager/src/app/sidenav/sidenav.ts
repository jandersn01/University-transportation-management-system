import { Component } from '@angular/core';
import { navaBarData } from './nav-data';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class Sidenav {
  collapsed = true;
  navData = navaBarData
}
