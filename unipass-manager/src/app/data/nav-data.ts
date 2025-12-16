import { RouterLink } from "@angular/router";

export interface INavbarData {
    routeLink: string;
    icon: string;
    label: string;
    expanded?: boolean;    // Opcional: estado de aberto/fechado
    items?: INavbarData[]; // Opcional: sub-itens (recursivo)
}

export const navaBarData: INavbarData[] = [
    {
        routeLink: 'inicio',
        icon: 'fal fa-home', // Mantido: Perfeito para a página inicial.
        label: 'Início'
    },
    {
        routeLink: 'solicitacoes-estudantis',
        icon: 'fal fa-user-graduate', // Alterado: Ícone de "adicionar solicitação" ou "documento".
        label: 'Solicitações Estudantis'
    },
    {
        routeLink: 'gerenciamento',
        icon: 'fal fa-sitemap', // Alterado: Ícone que representa estrutura e organização.
        label: 'Gerenciamento',
        expanded: false, // Começa fechado
        items: [
            {
                routeLink: 'gerenciamento/estudantes',
                icon: 'fal fa-users', // Ícone opcional
                label: 'Estudantes'
            },
            {
                routeLink: 'gerenciamento/rotas',
                icon: 'fal fa-map-signs', // Ícone opcional
                label: 'Rotas'
            }
        ]
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