import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { SolicitacoesEstudantis } from './solicitacoes-estudantis/solicitacoes-estudantis';
export const routes: Routes = [
    {path: 'inicio', component: Inicio },
    {path: 'solicitacoes-estudantis', component: SolicitacoesEstudantis}
];
