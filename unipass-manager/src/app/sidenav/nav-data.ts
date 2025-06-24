import { RouterLink } from "@angular/router";

export const navaBarData = [
    {
        routeLink: 'inicio',
        icon: 'fal fa-home', // Mantido: Perfeito para a página inicial.
        label: 'inicio'
    },
    {
        routeLink: 'solicitacoes-estudantis',
        icon: 'fal fa-user-graduate', // Alterado: Ícone de "adicionar solicitação" ou "documento".
        label: 'Solicitações Estudantis'
    },
    {
        routeLink: 'gerenciamento',
        icon: 'fal fa-sitemap', // Alterado: Ícone que representa estrutura e organização.
        label: 'Gerenciamento'
    },
    {
        routeLink: 'comunicacao',
        icon: 'fal fa-bullhorn', // Alterado: Ícone universal para anúncios e comunicação.
        label: 'Comunicação'
    },
    {
        routeLink: 'administracao',
        icon: 'fal fa-user-shield', // Alterado: Combina "usuário" com "segurança/privilégios de admin".
        label: 'Administração'
    },
    {
        routeLink: 'configuracoes',
        icon: 'fal fa-cog', // Alterado: Ícone universal para configurações.
        label: 'Configurações'
    },
];