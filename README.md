# 📊 Dashboard Hub

Uma plataforma web para gestão, monitoramento e visualização de dados de encontros, participantes e ações de impacto social.

O Dashboard Hub foi desenvolvido para transformar planilhas em informações visuais, permitindo que organizações acompanhem indicadores de participação, diversidade, investimentos, alcance territorial e evidências de suas atividades.

---

## ✨ Visão Geral

A plataforma reúne informações de encontros realizados por organizações e apresenta indicadores de forma simples e intuitiva.

Entre as informações disponíveis estão:

- 👥 Participantes
- 📈 Perfil dos participantes
- 💰 Investimentos realizados
- 🚍 Meios de transporte utilizados
- 🗺️ Mapa de bairros de origem
- 📂 Evidências do encontro
- 📊 Indicadores automáticos

O objetivo é facilitar o acompanhamento de projetos sociais, oficinas, capacitações, reuniões e eventos.

---

## 📸 Dashboard

*(Adicione aqui uma imagem ou GIF da aplicação)*

```text
Resumo do encontro

├── Lista de presença
├── Número de participantes
├── Perfil dos participantes
│   ├── Gênero
│   ├── Raça
│   ├── Faixa etária
│   ├── Escolaridade
│   ├── Renda
│   ├── Deficiência
│   ├── Área profissional
│   └── Vínculo profissional
│
├── Informações do encontro
│   ├── Gastos
│   ├── Transporte
│   ├── Mapa de bairros
│   └── Evidências
```

---

# 🚀 Funcionalidades

- Dashboard totalmente responsivo
- Componentes reutilizáveis
- Visualização de indicadores em tempo real
- Mapa interativo utilizando Leaflet
- Organização modular dos componentes
- Preparado para integração com Google Sheets
- Estrutura preparada para banco de dados

---

# 🛠️ Tecnologias

- React
- Vite
- JavaScript
- CSS
- React Leaflet
- Lucide React

---

# 📁 Estrutura do Projeto

```
src/

components/
│
├── Perfil/
│
├── Encontro/
│
├── ListaParticipantes.jsx
├── NumeroParticipantes.jsx
│
data/
│
utils/

App.jsx
App.css
```

---

# 📊 Componentes

### Perfil dos participantes

- Gênero
- Raça
- Faixa etária
- Escolaridade
- Faixa de renda
- Pessoa com deficiência
- Área profissional
- Vínculo profissional

### Informações do encontro

- Gastos
- Transporte
- Bairros
- Evidências

---

# 📂 Estrutura dos Dados

A aplicação foi projetada para trabalhar com uma base de dados semelhante a:

| Campo |
|--------|
| id |
| data_encontro |
| nome |
| email |
| genero |
| raca |
| faixa_etaria |
| escolaridade |
| renda |
| deficiente |
| deficiencia |
| area_trabalho |
| vinculo_profissional |
| bairro |
| transporte_usado |
| gasto_alimentacao |
| gasto_transporte |
| gasto_material |

Além disso existe uma tabela específica para evidências:

| Campo |
|--------|
| id |
| id_encontro |
| tipo |
| titulo |
| descricao |
| url |

---

# 🚧 Próximas funcionalidades

- [ ] Integração com Google Sheets
- [ ] Cadastro de encontros
- [ ] Cadastro de participantes
- [ ] Upload de evidências
- [ ] Dashboard geral
- [ ] Dashboard por projeto
- [ ] Dashboard por organização
- [ ] Exportação de relatórios
- [ ] Autenticação de usuários
- [ ] API própria

---

# 💡 Objetivo

Este projeto nasceu da necessidade de facilitar a gestão e a análise de ações de impacto social, permitindo que organizações transformem dados coletados em indicadores úteis para tomada de decisão.

A arquitetura foi construída priorizando:

- organização do código;
- reutilização de componentes;
- facilidade de manutenção;
- escalabilidade.

---

# ▶️ Como executar

Clone o projeto:

```bash
git clone https://github.com/Hercls/dashboard-hub.git
```

Entre na pasta:

```bash
cd dashboard-hub
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

# 👨‍💻 Autor

**Hércules Gabriel Nascimento**

Geógrafo • Analista de Projetos • Desenvolvedor Full Stack em formação

GitHub:
https://github.com/Hercls

LinkedIn:
*(adicione seu LinkedIn aqui)*

---

# 📄 Licença

Este projeto está licenciado sob a licença MIT.
