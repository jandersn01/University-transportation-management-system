# 🚌 UniPass - Sistema de Gestão de Transporte Universitário

<div align="center">

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Angular](https://img.shields.io/badge/Angular-20.0.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

## 📋 Sobre o Projeto

O **UniPass** é um sistema completo de gestão de transporte universitário desenvolvido para auxiliar estudantes, motoristas e gestores públicos no controle e na gestão do transporte universitário intermunicipal. O sistema oferece uma solução moderna que centraliza os processos e melhora significativamente a experiência dos usuários.

### 🎯 Objetivos e Propósito

O sistema UniPass apresenta uma solução eficiente, segura e moderna para a gestão do transporte gratuito estudantil, beneficiando tanto os estudantes quanto os órgãos públicos responsáveis pelo serviço. Foi desenvolvido com foco em:

- **Facilidade de Gerenciamento**: Controle da quantidade de vagas disponíveis, evitando superlotação ou ociosidade
- **Segurança e Confiabilidade**: Garantia de autenticidade dos estudantes e confiabilidade nos processos
- **Otimização das Rotas**: Planejamento baseado na quantidade de estudantes por universidade
- **Comunicação Eficiente**: Substituição de canais informais por um sistema centralizado
- **Acesso Facilitado**: Processo digital para renovação de carteirinha estudantil
- **Identificação Automatizada**: Sistema de check-in digital para estudantes

## 🚀 Funcionalidades

### ✅ **Implementadas**
- 🏠 **Dashboard Inicial**: Estatísticas em tempo real e visão geral do sistema
- 👥 **Gestão de Solicitações**: Controle completo de solicitações estudantis
- 📝 **Cadastro de Estudantes**: Formulário completo com validações
- 🔍 **Filtros Avançados**: Busca e filtros por status, data, universidade
- 📊 **Relatórios**: Exportação e visualização de dados
- 🔄 **API REST**: Integração com json-server para persistência
- 📱 **Design Responsivo**: Interface adaptável para todos os dispositivos
- 🎨 **Sistema de Design**: Paleta de cores consistente e componentes reutilizáveis
- 🔐 **Sistema de Validação**: Análise, aprovação ou recusa de solicitações
- 📋 **Cadastro Completo**: Dados pessoais, acadêmicos e documentação
- 🔄 **Atualização de Status**: Controle do ciclo de vida das solicitações

### 🚧 **Em Desenvolvimento**
- 🛠️ **Gerenciamento de Rotas**: Criação e edição de rotas de transporte
- 📢 **Sistema de Comunicação**: Notificações e comunicados
- ⚙️ **Configurações**: Personalização do sistema e preferências
- 🎫 **Carteirinha Digital**: Credencial virtual para validação de embarque
- 📍 **Rastreamento**: Acompanhamento de trajeto dos ônibus em tempo real
- 📊 **Relatórios Avançados**: Estatísticas detalhadas de uso e operação

### 🔮 **Roadmap Futuro**
- 🔔 **Sistema de Notificações**: Push notifications e alertas
- 📱 **Aplicativo Mobile**: Apps nativos para Android e iOS
- 🏷️ **Integração NFC/RFID**: Leitores para validação física
- 🌐 **API Externa**: Integração com sistemas da prefeitura
- 📈 **Analytics Avançados**: Dashboard com métricas detalhadas
- 🔒 **Autenticação Multifator**: Maior segurança no acesso

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **[Angular 20.0.0](https://angular.io/)** - Framework principal
- **[TypeScript 5.8.2](https://www.typescriptlang.org/)** - Linguagem de programação
- **[TailwindCSS 4.1.8](https://tailwindcss.com/)** - Framework CSS
- **[RxJS 7.8.0](https://rxjs.dev/)** - Programação reativa
- **[Angular Signals](https://angular.io/guide/signals)** - Gerenciamento de estado

### **Backend/API**
- **[JSON Server](https://github.com/typicode/json-server)** - API REST mock
- **[Concurrently](https://www.npmjs.com/package/concurrently)** - Execução simultânea de processos

## 📁 Estrutura do Projeto

```
unipass-manager/
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizáveis
│   │   │   ├── card-component/
│   │   │   ├── sidenav/
│   │   │   └── student-management/
│   │   ├── data/                 # Dados estáticos e configurações
│   │   │   ├── estatisticas-data.ts
│   │   │   └── nav-data.ts
│   │   ├── inicio/               # Página inicial/dashboard
│   │   ├── pages/                # Páginas da aplicação
│   │   │   ├── administracao/    # Área administrativa
│   │   │   ├── not-found/        # Página 404
│   │   │   └── solicitacoes-estudantis/  # Gestão de solicitações
│   │   ├── services/             # Serviços e APIs
│   │   │   ├── estudantes.ts
│   │   │   ├── layout.service.ts
│   │   │   └── estudantes.service.ts
│   │   ├── app.component.*       # Componente raiz
│   │   └── app.routes.ts         # Configuração de rotas
│   ├── assets/                   # Recursos estáticos
│   ├── styles.css               # Estilos globais
│   └── main.ts                  # Ponto de entrada da aplicação
├── database.json                # Base de dados JSON Server
├── package.json                 # Dependências e scripts
├── LICENSE                      # Licença MIT
├── .gitignore                   # Arquivos ignorados pelo Git
└── README.md                    # Este arquivo
```

## 🚀 Como Executar o Projeto

### **Pré-requisitos**
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Angular CLI](https://cli.angular.io/) (opcional, mas recomendado)

### **1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd University-transportation-management-system
```

### **2. Instale as dependências**
```bash
cd unipass-manager
npm install
```

### **3. Execute o projeto**

**Opção 1: Servidor de desenvolvimento + API (Recomendado)**
```bash
npm run dev
```
Este comando executa simultaneamente:
- Frontend Angular em `http://localhost:4200`
- API JSON Server em `http://localhost:3000`

**Opção 2: Apenas o frontend**
```bash
npm start
```

**Opção 3: Apenas a API**
```bash
npm run api
```

### **4. Acesse a aplicação**
- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **API**: [http://localhost:3000](http://localhost:3000)
- **API Endpoints**: [http://localhost:3000/estudantes](http://localhost:3000/estudantes)

## 🗂️ API e Base de Dados

O projeto utiliza **JSON Server** para simular uma API REST. Os dados são armazenados em `database.json`.

### **Endpoints Disponíveis:**
- `GET /estudantes` - Lista todos os estudantes
- `POST /estudantes` - Cria novo estudante

### **Estrutura de Dados:**
```json
{
  "estudantes": [
    {
      "id": 1,
      "nomeCompleto": "João Silva",
      "cpf": "123.456.789-00",
      "universidade": "UFPB",
      "campus": "Campus I",
      "statusCadastro": "aprovado",
      "dataCadastro": "2024-01-15"
    }
  ]
}
```

## 🎨 Sistema de Design

### **Paleta de Cores**
```css
:root {
  --primary-color: #3498db;      /* Azul principal */
  --primary-hover: #2980b9;      /* Azul hover */
  --success-color: #27ae60;      /* Verde sucesso */
  --warning-color: #f39c12;      /* Laranja aviso */
  --danger-color: #e74c3c;       /* Vermelho erro */
  --sidenav-color: #263238;      /* Cinza sidenav */
}
```

### **Componentes Padrão**
- **Cards**: Componentes reutilizáveis para estatísticas
- **Formulários**: Validação e feedback consistente
- **Tabelas**: Design responsivo e paginação
- **Botões**: Hierarquia visual clara

## 🛣️ Rotas da Aplicação

| Rota | Componente | Status | Descrição |
|------|------------|--------|-----------|
| `/` | Redirect → `/inicio` | ✅ | Redirecionamento raiz |
| `/inicio` | `Inicio` | ✅ | Dashboard principal |
| `/solicitacoes-estudantis` | `SolicitacoesEstudantis` | ✅ | Gestão de solicitações |
| `/administracao` | `Administracao` | ✅ | Área administrativa |
| `/gerenciamento` | Redirect → `/404` | 🚧 | Em desenvolvimento |
| `/comunicacao` | Redirect → `/404` | 🚧 | Em desenvolvimento |
| `/configuracoes` | Redirect → `/404` | 🚧 | Em desenvolvimento |
| `/404` | `NotFound` | ✅ | Página de erro |
| `/**` | Redirect → `/404` | ✅ | Fallback para rotas inválidas |

## 🌐 Compatibilidade

### **Navegadores Suportados**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### **Dispositivos**
- 📱 **Mobile**: iOS 13+, Android 8+
- 💻 **Desktop**: Windows 10+, macOS 10.15+, Linux
- 📟 **Tablet**: iPadOS 13+, Android tablets

## 🤝 Contribuição

### **Como Contribuir**
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Desenvolvimento** | `npm run dev` | Executa frontend + API simultaneamente |
| **Servidor** | `npm start` | Inicia apenas o servidor Angular |
| **API** | `npm run api` | Inicia apenas o JSON Server |
| **Build** | `npm run build` | Compila para produção |
| **Testes** | `npm run test` | Executa testes unitários |
| **Lint** | `npm run lint` | Análise de código |
| **Watch** | `npm run test:watch` | Testes em modo watch |

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">

**🚌 UniPass - Transformando a gestão de transporte universitário**

</div>