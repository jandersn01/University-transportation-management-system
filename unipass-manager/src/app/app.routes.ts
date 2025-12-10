import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { SolicitacoesEstudantis } from './pages/solicitacoes-estudantis/solicitacoes-estudantis';
import { Administracao } from './pages/administracao/administracao';
//import { AnaliseDeCadastro } from './pages/solicitacoes-estudantis/paginas/analise-de-cadastro/analise-de-cadastro';
import { CadastroEstudantes } from './pages/cadastro-estudantes/cadastro-estudantes';
import { NotFound } from './pages/not-found/not-found';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: Inicio, canActivate: [AuthGuard] },
    {path: 'solicitacoes-estudantis', component: SolicitacoesEstudantis, children: [
        //{path: 'analisedecadastro', component: AnaliseDeCadastro}
    ]},
    {path:'administracao', component: Administracao,
        children:[
            {path: 'cadastrarestudantes', component: CadastroEstudantes}
        ]
    },
    // Redirecionamentos para páginas não implementadas
    {path: 'gerenciamento', redirectTo: '/404', pathMatch: 'full'},
    {path: 'comunicacao', redirectTo: '/404', pathMatch: 'full'},
    {path: 'configuracoes', redirectTo: '/404', pathMatch: 'full'},
    // Página 404
    {path: '404', component: NotFound},
    // Wildcard route para qualquer rota não encontrada
    {path: '**', redirectTo: '/login'}
];
