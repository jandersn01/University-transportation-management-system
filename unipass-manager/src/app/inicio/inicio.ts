import { Component } from '@angular/core';
import { CardComponent } from '../components/card-component/card-component';
import { horarioData } from './horario-data';

@Component({
  selector: 'app-inicio',
  imports: [CardComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  horarios = horarioData;

  

}
