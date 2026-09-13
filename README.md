# DashboardImpacto — Global Shapers Hub Fortaleza

Plataforma web desenvolvida para registrar, organizar e visualizar dados dos encontros e ações presenciais do **Global Shapers Community — Hub Fortaleza**.

O DashboardImpacto transforma os dados coletados durante os encontros em informações visuais sobre participação, diversidade, território, mobilidade, recursos movimentados e evidências das atividades realizadas.

---

## Sobre o projeto

O DashboardImpacto foi desenvolvido para apoiar o acompanhamento dos encontros presenciais realizados pelo Hub Fortaleza.

A plataforma centraliza três processos principais:

1. coleta de dados dos participantes;
2. gestão dos encontros e registros;
3. visualização dos dados em dashboards.

Cada encontro possui um formulário público próprio. Após o envio das respostas, os dados são armazenados no banco e passam a alimentar automaticamente os indicadores e visualizações do dashboard.

---

## Principais funcionalidades

### Dashboard

Visualização consolidada dos dados de cada encontro, incluindo:

- número de participantes;
- lista de presença;
- gênero;
- raça/cor;
- faixa etária;
- escolaridade;
- renda familiar;
- pessoas com deficiência;
- área profissional;
- vínculo profissional;
- transporte utilizado;
- gastos com alimentação, transporte e materiais;
- dinheiro movimentado;
- bairros de origem dos participantes;
- mapa temático de Fortaleza;
- evidências e registros do encontro.

Os indicadores são recalculados automaticamente a partir dos dados armazenados no banco.

### Formulário público

Cada encontro pode possuir um link próprio de participação:

```text
/participar?id=<ID_DO_ENCONTRO>
```

O formulário permite registrar informações dos participantes sem necessidade de autenticação.

O encontro é definido automaticamente pelo link compartilhado, evitando que o participante precise selecionar manualmente a atividade.

### Administração

A área administrativa permite:

- criar encontros;
- editar encontros;
- excluir encontros;
- gerar/copiar o link público de participação;
- visualizar participantes;
- editar dados dos participantes;
- excluir participantes;
- cadastrar evidências;
- editar evidências;
- excluir evidências.

### Autenticação e autorização

O acesso às áreas internas utiliza **Neon Auth**.

Existem diferentes níveis de acesso:

- **Público:** envio do formulário de participação;
- **Membro autenticado:** acesso aos dados e dashboard;
- **Administrador:** gerenciamento de encontros, participantes e evidências.

As permissões de acesso aos dados são protegidas também no banco através de **Row-Level Security (RLS)**.

---

## Tecnologias utilizadas

### Front-end

- React
- Vite
- JavaScript
- CSS
- Recharts
- React Leaflet
- Leaflet
- Lucide React

### Back-end e banco de dados

- Neon Postgres
- Neon Data API
- Neon Auth
- PostgreSQL
- Row-Level Security (RLS)

### Deploy

- Vercel

---

## Estrutura geral

```text
DashboardImpacto
│
├── Dashboard
│   ├── Resumo do encontro
│   ├── Perfil dos participantes
│   ├── Informações do encontro
│   ├── Mapa de bairros
│   └── Evidências
│
├── Participação pública
│   └── Formulário por encontro
│
├── Administração
│   ├── Encontros
│   ├── Participantes
│   └── Evidências
│
├── Neon Auth
│
└── Neon Postgres
```

---

## Estrutura do projeto

```text
src/
├── components/
│   ├── Encontro/
│   ├── Perfil/
│   ├── Login.jsx
│   ├── SeletorEncontro.jsx
│   └── UsuarioMenu.jsx
│
├── data/
│   └── Bairros_de_Fortaleza.geojson
│
├── lib/
│   └── neon.js
│
├── pages/
│   ├── Admin.jsx
│   ├── GerenciarEncontro.jsx
│   └── Participar.jsx
│
├── services/
│   └── dados.js
│
├── App.jsx
├── App.css
└── main.jsx
```

---

## Banco de dados

A aplicação utiliza PostgreSQL hospedado no Neon.

As principais tabelas são:

### `encontros`

Armazena as informações dos encontros realizados.

Principais campos:

```text
id
titulo
data_encontro
local
created_at
```

### `participantes`

Armazena os dados coletados pelo formulário público.

Entre as informações registradas estão:

```text
id
id_encontro
nome
email
genero
raca
faixa_etaria
escolaridade
renda
deficiente
deficiencia
area_trabalho
vinculo_profissional
bairro
transporte_usado
gasto_alimentacao
gasto_transporte
gasto_material
```

### `evidencias`

Registra materiais e evidências relacionados aos encontros.

```text
id
id_encontro
tipo
titulo
descricao
url
```

### `usuarios_hub`

Relaciona os usuários autenticados aos seus respectivos níveis de acesso dentro da plataforma.

---

## Segurança

A aplicação utiliza duas camadas principais de controle de acesso:

### Autenticação

Realizada através do Neon Auth.

### Autorização

As permissões são aplicadas diretamente no PostgreSQL através de políticas de **Row-Level Security (RLS)**.

Dessa forma, esconder funcionalidades na interface não é utilizado como mecanismo principal de segurança.

O formulário público possui apenas a permissão necessária para registrar participações.

---

## Executando localmente

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd dashboard-hub
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo:

```text
.env
```

na raiz do projeto.

Adicione:

```env
VITE_NEON_AUTH_URL=seu_neon_auth_url
VITE_NEON_DATA_API_URL=seu_neon_data_api_url
```

> Nunca publique o arquivo `.env` ou credenciais do projeto no repositório.

### 4. Execute o projeto

```bash
npm run dev
```

O Vite disponibilizará o endereço local da aplicação.

---

## Build de produção

Para gerar a versão otimizada:

```bash
npm run build
```

Os arquivos de produção serão criados em:

```text
dist/
```

Para testar o build localmente:

```bash
npm run preview
```

---

## Rotas

| Rota | Acesso | Função |
|---|---|---|
| `/` | Autenticado | Dashboard dos encontros |
| `/admin` | Administrador | Administração da plataforma |
| `/participar?id=<id>` | Público | Formulário de participação |

Como a aplicação funciona como SPA, o deploy utiliza configuração de rewrite para direcionar as rotas para `index.html`.

---

## Responsividade

A interface foi desenvolvida para funcionar tanto em computadores quanto em dispositivos móveis.

Foram adaptados para telas menores:

- navegação;
- cards;
- gráficos;
- tabelas e listas;
- formulários;
- informações financeiras;
- transporte;
- mapa de bairros;
- administração.

---

## Fluxo de dados

```text
Participante
     │
     ▼
Formulário público
     │
     ▼
Neon Data API
     │
     ▼
PostgreSQL
     │
     ├──────────────► Área administrativa
     │
     └──────────────► Dashboard
                          │
                          ├── Indicadores
                          ├── Gráficos
                          ├── Gastos
                          ├── Transporte
                          └── Mapa
```

---

## Status do projeto

**Versão inicial em produção.**

Funcionalidades implementadas:

- [x] autenticação;
- [x] autorização por usuário;
- [x] criação e gerenciamento de encontros;
- [x] formulário público;
- [x] gerenciamento de participantes;
- [x] gerenciamento de evidências;
- [x] dashboard dinâmico;
- [x] gráficos de perfil;
- [x] indicadores financeiros;
- [x] análise de transporte;
- [x] mapa de bairros;
- [x] integração com Neon;
- [x] Row-Level Security;
- [x] interface responsiva;
- [x] deploy em produção.

---

## Próximas melhorias

Entre as evoluções possíveis da plataforma estão:

- proteção anti-spam no formulário público;
- melhorias de acessibilidade;
- otimização do bundle e carregamento sob demanda;
- exportação de dados e relatórios;
- novos indicadores de impacto;
- aprimoramento do histórico de encontros;
- expansão para acompanhamento de projetos e ações do Hub.

---

## Contexto

O **Global Shapers Community — Hub Fortaleza** reúne jovens que desenvolvem iniciativas de impacto local em Fortaleza.

O DashboardImpacto foi criado como uma ferramenta de apoio à organização, memória e compreensão dos encontros e atividades realizados pelo Hub.

---

## Licença e uso

Projeto desenvolvido para uso do **Global Shapers Community — Hub Fortaleza**.

Antes de reutilizar, distribuir ou adaptar o sistema e seus dados, consulte as regras internas do projeto e da comunidade.