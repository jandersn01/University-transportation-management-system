import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { acoesDeAdministracao } from './acoes';

@Component({
  selector: 'app-administracao',
  imports: [RouterModule],
  templateUrl: './administracao.html',
  styleUrl: './administracao.css'
})
export class Administracao {
  acoes = acoesDeAdministracao;
}
