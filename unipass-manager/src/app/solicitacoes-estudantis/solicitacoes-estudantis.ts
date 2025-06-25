import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { acoesDeSolicitacoesestudantis } from './acoes';

@Component({
  selector: 'app-solicitacoes-estudantis',
  imports: [RouterModule],
  templateUrl: './solicitacoes-estudantis.html',
  styleUrl: './solicitacoes-estudantis.css'
})
export class SolicitacoesEstudantis {
  acoes = acoesDeSolicitacoesestudantis;
}
