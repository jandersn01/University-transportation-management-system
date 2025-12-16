import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { SolicitacoesEstudantis } from './pages/solicitacoes-estudantis/solicitacoes-estudantis';
import { Administracao } from './pages/administracao/administracao';
import { CadastroEstudantes } from './pages/cadastro-estudantes/cadastro-estudantes';
import { NotFound } from './pages/not-found/not-found';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';

// Gerenciamento
import { GerenciamentoRotas } from './pages/gerenciamento/gerenciamento-rotas/gerenciamento-rotas';
import { Gerenciamento as GerenciamentoAlunos } from './pages/gerenciamento/gerenciamentoAlunos/gerenciamento';

export const routes: Routes = [

  // Redirect inicial
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent },

  // Início (protegido)
  { path: 'inicio', component: Inicio, canActivate: [AuthGuard] },

  // Solicitações
  {
    path: 'solicitacoes-estudantis',
    component: SolicitacoesEstudantis,
    canActivate: [AuthGuard]
  },

  // Administração
  {
    path: 'administracao',
    component: Administracao,
    canActivate: [AuthGuard],
    children: [
      { path: 'cadastrarestudantes', component: CadastroEstudantes }
    ]
  },

  // Gerenciamento (pai)
  {
    path: 'gerenciamento',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'estudantes', pathMatch: 'full' },
      { path: 'estudantes', component: GerenciamentoAlunos },
      { path: 'rotas', component: GerenciamentoRotas }
    ]
  },

  // Página 404
  { path: '404', component: NotFound },

  // Wildcard
  { path: '**', redirectTo: '/404' }
];
