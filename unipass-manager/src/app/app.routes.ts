import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { SolicitacoesEstudantis } from './pages/solicitacoes-estudantis/solicitacoes-estudantis';
import { Administracao } from './pages/administracao/administracao';
import { CadastroEstudantes } from './pages/cadastro-estudantes/cadastro-estudantes';
import { NotFound } from './pages/not-found/not-found';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';

// 1. Importe o componente de Rotas (Verifique se o caminho da pasta está exato)
import { GerenciamentoRotas } from './pages/gerenciamento/gerenciamento-rotas/gerenciamento-rotas';

// 2. Importe o gerenciamento antigo (de alunos). 
// Sugestão: Use 'as' para renomear e evitar confusão, já que agora temos dois gerenciamentos.
import { Gerenciamento as GerenciamentoAlunos } from './pages/gerenciamento/gerenciamentoAlunos/gerenciamento';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    
    { path: 'inicio', component: Inicio },
    
    { 
        path: 'solicitacoes-estudantis', 
        component: SolicitacoesEstudantis, 
        children: [
            //{path: 'analisedecadastro', component: AnaliseDeCadastro}
        ]
    },
    
    {
        path: 'administracao', 
        component: Administracao,
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: Inicio, canActivate: [AuthGuard] },
    {path: 'solicitacoes-estudantis', component: SolicitacoesEstudantis, children: [
        //{path: 'analisedecadastro', component: AnaliseDeCadastro}
    ]},
    {path:'administracao', component: Administracao,
        children:[
            { path: 'cadastrarestudantes', component: CadastroEstudantes }
        ]
    },

    // --- MUDANÇA AQUI: Estrutura Pai/Filho para Gerenciamento ---
    {
        path: 'gerenciamento',
        // Nota: Não colocamos 'component' aqui no pai, pois queremos que os filhos
        // sejam renderizados diretamente no <router-outlet> principal (onde o pai renderizaria).
        children: [
            // Se o usuário acessar apenas '/gerenciamento', redireciona para estudantes
            { path: '', redirectTo: 'estudantes', pathMatch: 'full' },
            
            // Rota: /gerenciamento/estudantes
            { path: 'estudantes', component: GerenciamentoAlunos },
            
            // Rota: /gerenciamento/rotas
            { path: 'rotas', component: GerenciamentoRotas }
        ]
    },
    // -------------------------------------------------------------

    { path: 'comunicacao', redirectTo: '/404', pathMatch: 'full' },
    { path: 'configuracoes', redirectTo: '/404', pathMatch: 'full' },
    
    // Página 404
    { path: '404', component: NotFound },
    
    // Wildcard
    { path: '**', redirectTo: '/404' }
];
    {path: '404', component: NotFound},
    // Wildcard route para qualquer rota não encontrada
    {path: '**', redirectTo: '/login'}
];
