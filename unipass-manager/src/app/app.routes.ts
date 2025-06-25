import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { SolicitacoesEstudantis } from './solicitacoes-estudantis/solicitacoes-estudantis';
import { Gerenciamento } from './gerenciamento/gerenciamento';
import { Comunicacao } from './comunicacao/comunicacao';
import { Administracao } from './administracao/administracao';
import { Configuracoes } from './configuracoes/configuracoes';
import { AnaliseDeCadastro } from './solicitacoes-estudantis/paginas/analise-de-cadastro/analise-de-cadastro';
import { Component } from '@angular/core';
import { CadastroEstudantes } from './administracao/paginas/cadastro-estudantes/cadastro-estudantes';




export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    {path: 'inicio', component: Inicio },
    {path: 'solicitacoes-estudantis', component: SolicitacoesEstudantis, children: [
        {path: 'analisedecadastro', component: AnaliseDeCadastro}
    ]},
    {path: 'gerenciamento', component: Gerenciamento},
    {path: 'comunicacao', component: Comunicacao},
    {path:'administracao', component: Administracao,
        children:[
            {path: 'cadastrarestudantes', component: CadastroEstudantes}
        ]
    },
    {path: 'configuracoes', component: Configuracoes}

];
