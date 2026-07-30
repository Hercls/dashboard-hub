import "./App.css";

import ListaParticipantes from "./components/ListaParticipantes";
import NumeroParticipantes from "./components/NumeroParticipantes";

import Genero from "./components/Perfil/Genero";
import Raca from "./components/Perfil/Raca";
import FaixaEtaria from "./components/Perfil/FaixaEtaria";
import Escolaridade from "./components/Perfil/Escolaridade";
import Renda from "./components/Perfil/Renda";
import Deficiencia from "./components/Perfil/Deficiencia";
import AreaProfissional from "./components/Perfil/AreaProfissional";
import VinculoProfissional from "./components/Perfil/VinculoProfissional";

import Transporte from "./components/Encontro/Transporte";
import Bairros from "./components/Encontro/Bairros";
import Gastos from "./components/Encontro/Gastos";
import Evidencias from "./components/Encontro/Evidencias";


const evidenciasDoEncontro = [
  {
    id: 1,
    tipo: "foto",
    titulo: "Registro fotográfico",
    descricao: "Fotografias realizadas durante o encontro.",
    url: "https://exemplo.com/fotos",
  },
  {
    id: 2,
    tipo: "documento",
    titulo: "Lista de presença",
    descricao: "Documento com o registro dos participantes.",
    url: "https://exemplo.com/lista-presenca.pdf",
  },
  {
    id: 3,
    tipo: "apresentacao",
    titulo: "Apresentação do encontro",
    descricao: "Slides utilizados durante a atividade.",
    url: "https://exemplo.com/apresentacao",
  },
  {
    id: 4,
    tipo: "link",
    titulo: "Publicação nas redes sociais",
    descricao: "Postagem sobre os resultados do encontro.",
    url: "https://exemplo.com/publicacao",
  },
];

function App() {
  const participantes = [
    {
      id: 1,
      data_encontro: "25/07/2026",
      nome: "Ana Fabian",
      email: "ana@email.com",
      genero: "Mulher",
      raca: "Parda",
      faixa_etaria: "25–34",
      escolaridade: "Ensino Superior completo",
      renda: "De 2 a 5 salários mínimos",
      deficiente: "Não",
      deficiencia: "",
      area_trabalho: "Comunicação",
      vinculo_profissional: "Autônomo(a)",
      bairro: "Benfica",
      transporte_usado: "Ônibus",
      gasto_alimentacao: 25,
      gasto_transporte: 12,
      gasto_material: 0,
      foto: "",
    },
    {
      id: 1,
      data_encontro: "25/07/2026",
      nome: "Hércules Nascimento",
      email: "hercules@email.com",
      genero: "Homem",
      raca: "Parda",
      faixa_etaria: "25–34",
      escolaridade: "Ensino Superior completo",
      renda: "De 2 a 5 salários mínimos",
      deficiente: "Não",
      deficiencia: "",
      area_trabalho: "Meio Ambiente",
      vinculo_profissional: "Empregado(a)",
      bairro: "José Bonifácio",
      transporte_usado: "Bicicleta",
      gasto_alimentacao: 30,
      gasto_transporte: 0,
      gasto_material: 10,
      foto: "",
    },
    {
      id: 1,
      data_encontro: "25/07/2026",
      nome: "Marina Oliveira",
      email: "marina@email.com",
      genero: "Mulher",
      raca: "Branca",
      faixa_etaria: "25–34",
      escolaridade: "Especialização",
      renda: "De 5 a 10 salários mínimos",
      deficiente: "Não",
      deficiencia: "",
      area_trabalho: "Comunicação",
      vinculo_profissional: "Freelancer",
      bairro: "Aldeota",
      transporte_usado: "Carro (particular)",
      gasto_alimentacao: 28,
      gasto_transporte: 22,
      gasto_material: 5,
      foto: "",
    },
    {
      id: 1,
      data_encontro: "25/07/2026",
      nome: "Lucas Almeida",
      email: "lucas@email.com",
      genero: "Homem trans",
      raca: "Preta",
      faixa_etaria: "18–24",
      escolaridade: "Ensino Superior incompleto",
      renda: "De 1 a 2 salários mínimos",
      deficiente: "Sim",
      deficiencia: "Visual",
      area_trabalho: "Tecnologia",
      vinculo_profissional: "Estudante",
      bairro: "Parangaba",
      transporte_usado: "Carro (aplicativo)",
      gasto_alimentacao: 20,
      gasto_transporte: 10,
      gasto_material: 0,
      foto: "",
    },
    {
      id: 1,
      data_encontro: "25/07/2026",
      nome: "Carla Sousa",
      email: "carla@email.com",
      genero: "Pessoa não binária",
      raca: "Indígena",
      faixa_etaria: "35–44",
      escolaridade: "Mestrado",
      renda: "Prefiro não responder",
      deficiente: "Sim",
      deficiencia: "Física; Auditiva",
      area_trabalho: "Educação",
      vinculo_profissional: "Pesquisador(a)",
      bairro: "Parangaba",
      transporte_usado: "Moto (aplicativo)",
      gasto_alimentacao: 35,
      gasto_transporte: 18,
      gasto_material: 12,
      foto: "",
    },
    {
      id: 2,
      data_encontro: "30/08/2026",
      nome: "Participante de outro encontro",
      email: "outro@email.com",
      genero: "Homem",
      raca: "Branca",
      faixa_etaria: "35–44",
      escolaridade: "Ensino Superior completo",
      renda: "De 5 a 10 salários mínimos",
      deficiente: "Não",
      deficiencia: "",
      area_trabalho: "Engenharia",
      vinculo_profissional: "Empresário(a)",
      bairro: "Parangaba",
      transporte_usado: "Outro: fui a pé",
      gasto_alimentacao: 40,
      gasto_transporte: 25,
      gasto_material: 10,
      foto: "",
    },
  ];

  const idEncontroSelecionado = 1;

  const dadosDoEncontro = participantes.filter(
    (participante) =>
      participante.id === idEncontroSelecionado
  );

  const dataEncontro =
    dadosDoEncontro.length > 0
      ? dadosDoEncontro[0].data_encontro
      : "Data não encontrada";

  return (
    <main className="dashboard">
      <header className="cabecalho-dashboard">
        <h1>Encontro Presencial do Hub Fortaleza</h1>
        <p>Data do encontro: {dataEncontro}</p>
      </header>

      <section className="resumo-encontro">
        <ListaParticipantes dados={dadosDoEncontro} />

        <NumeroParticipantes
          total={dadosDoEncontro.length}
        />
      </section>

      <section className="perfil-participantes">
        <h2 className="titulo-secao">
          Perfil dos participantes
        </h2>

        <div className="grade-perfil">
          <Genero dados={dadosDoEncontro} />

          <Raca dados={dadosDoEncontro} />

          <FaixaEtaria dados={dadosDoEncontro} />

          <Escolaridade dados={dadosDoEncontro} />

          <Renda dados={dadosDoEncontro} />

          <Deficiencia dados={dadosDoEncontro} />

          <AreaProfissional dados={dadosDoEncontro} />

          <VinculoProfissional dados={dadosDoEncontro} />
        </div>

      </section>

      <section className="dados-encontro">
        <h2 className="titulo-secao">
          Informações do encontro
        </h2>

        <div className="linha-resumo-encontro">
          <Gastos dados={dadosDoEncontro} />

          <Transporte dados={dadosDoEncontro} />
        </div>

        <Bairros dados={dadosDoEncontro} />
        <Evidencias evidencias={evidenciasDoEncontro} />
      </section>

    </main>
  );
}

export default App;