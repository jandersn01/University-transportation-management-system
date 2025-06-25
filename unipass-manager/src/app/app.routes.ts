import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { SolicitacoesEstudantis } from './pages/solicitacoes-estudantis/solicitacoes-estudantis';
import { Gerenciamento } from './pages/gerenciamento/gerenciamento';
import { Comunicacao } from './pages/comunicacao/comunicacao';
import { Administracao } from './pages/administracao/administracao';
import { Configuracoes } from './pages/configuracoes/configuracoes';
import { AnaliseDeCadastro } from './pages/solicitacoes-estudantis/paginas/analise-de-cadastro/analise-de-cadastro';
import { Component } from '@angular/core';
import { CadastroEstudantes } from './pages/cadastro-estudantes/cadastro-estudantes';




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
