import { Component, Input } from "@angular/core";  

interface Horario {
  id: number;
  nome: string;
  descricao: string;
}

@Component({
    selector: 'card-component',
    standalone: true,
    templateUrl: './card-component.html',
    styleUrls: ['./card-component.css']
})
export class CardComponent {
    @Input() horario!: Horario;
}