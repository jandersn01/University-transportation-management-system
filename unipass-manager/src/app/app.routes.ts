import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { SolicitacoesEstudantis } from './solicitacoes-estudantis/solicitacoes-estudantis';
import { Gerenciamento } from './gerenciamento/gerenciamento';
import { Comunicacao } from './comunicacao/comunicacao';
import { Administracao } from './administracao/administracao';
import { Configuracoes } from './configuracoes/configuracoes';



export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    {path: 'inicio', component: Inicio },
    {path: 'solicitacoes-estudantis', component: SolicitacoesEstudantis},
    {path: 'gerenciamento', component: Gerenciamento},
    {path: 'comunicacao', component: Comunicacao},
    {path:'administracao', component: Administracao},
    {path: 'configuracoes', component: Configuracoes}

];
