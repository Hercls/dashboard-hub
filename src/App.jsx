import { useEffect, useState } from "react";

import "./App.css";

import Login from "./components/Login";
import UsuarioMenu from "./components/UsuarioMenu";
import ListaParticipantes from "./components/ListaParticipantes";
import NumeroParticipantes from "./components/NumeroParticipantes";
import SeletorEncontro from "./components/SeletorEncontro";

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

import Participar from "./pages/Participar";
import Admin from "./pages/Admin";
import GerenciarEncontro from "./pages/GerenciarEncontro";

import {
  buscarEncontros,
  buscarParticipantes,
  buscarEvidencias,
  buscarUsuarioHub,
} from "./services/dados";

import { authClient } from "./lib/neon";

function App() {
  // ===========================
  // AUTENTICAÇÃO
  // ===========================

  const [sessao, setSessao] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [usuarioHub, setUsuarioHub] = useState(null);

  const [verificandoSessao, setVerificandoSessao] =
    useState(true);

  // ===========================
  // DADOS
  // ===========================

  const [encontros, setEncontros] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [evidencias, setEvidencias] = useState([]);

  const [
    idEncontroSelecionado,
    setIdEncontroSelecionado,
  ] = useState(null);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] =
    useState("");

  // ===========================
  // PÁGINAS
  // ===========================

  const paginaParticipar =
    window.location.pathname === "/participar";

  const paginaAdmin =
    window.location.pathname === "/admin";

  // ===========================
  // VERIFICAR SESSÃO
  // ===========================

  useEffect(() => {
    async function verificarSessao() {
      try {
        const { data } =
          await authClient.getSession();

        setSessao(
          data?.session ?? null
        );

        setUsuario(
          data?.user ?? null
        );
      } catch (erroSessao) {
        console.error(
          "Erro ao verificar sessão:",
          erroSessao
        );

        setSessao(null);
        setUsuario(null);
      } finally {
        setVerificandoSessao(false);
      }
    }

    verificarSessao();
  }, []);

  // ===========================
  // LOGOUT
  // ===========================

  async function fazerLogout() {
    try {
      await authClient.signOut();

      setSessao(null);
      setUsuario(null);
      setUsuarioHub(null);

      setEncontros([]);
      setParticipantes([]);
      setEvidencias([]);

      setIdEncontroSelecionado(null);

      window.location.href = "/";
    } catch (erroLogout) {
      console.error(
        "Erro ao sair:",
        erroLogout
      );
    }
  }

  // ===========================
  // CARREGAR DADOS
  // ===========================

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const [
        encontrosCarregados,
        participantesCarregados,
        evidenciasCarregadas,
        usuarioHubCarregado,
      ] = await Promise.all([
        buscarEncontros(),
        buscarParticipantes(),
        buscarEvidencias(),
        buscarUsuarioHub(),
      ]);

      setEncontros(
        encontrosCarregados
      );

      setParticipantes(
        participantesCarregados
      );

      setEvidencias(
        evidenciasCarregadas
      );

      setUsuarioHub(
        usuarioHubCarregado
      );

      setIdEncontroSelecionado(
        (idAtual) => {
          if (idAtual !== null) {
            const encontroAindaExiste =
              encontrosCarregados.some(
                (encontro) =>
                  encontro.id === idAtual
              );

            if (encontroAindaExiste) {
              return idAtual;
            }
          }

          return (
            encontrosCarregados[0]?.id ??
            null
          );
        }
      );
    } catch (erroCarregamento) {
      console.error(
        "Erro ao carregar dados:",
        erroCarregamento
      );

      setErro(
        "Não foi possível carregar os dados do dashboard."
      );
    } finally {
      setCarregando(false);
    }
  }

  // ===========================
  // CARREGAR APÓS LOGIN
  // ===========================

  useEffect(() => {
    if (!sessao) {
      return;
    }

    carregarDados();
  }, [sessao]);

  // ===========================
  // FORMULÁRIO PÚBLICO
  // ===========================

  if (paginaParticipar) {
    return <Participar />;
  }

  // ===========================
  // VERIFICANDO SESSÃO
  // ===========================

  if (verificandoSessao) {
    return (
      <main className="estado-pagina">
        <div className="estado-carregamento">
          <span className="spinner" />

          <strong>
            Verificando acesso
          </strong>

          <p>
            Aguarde enquanto verificamos
            sua sessão.
          </p>
        </div>
      </main>
    );
  }

  // ===========================
  // LOGIN
  // ===========================

  if (!sessao) {
    return <Login />;
  }

  // ===========================
  // CARREGAMENTO
  // ===========================

  if (carregando) {
    return (
      <main className="estado-pagina">
        <div className="estado-carregamento">
          <span className="spinner" />

          <strong>
            Carregando dashboard
          </strong>

          <p>
            Aguarde enquanto buscamos
            os dados dos encontros.
          </p>
        </div>
      </main>
    );
  }

  // ===========================
  // ERRO
  // ===========================

  if (erro) {
    return (
      <main className="estado-pagina">
        <div className="estado-erro">
          <strong>
            Não foi possível carregar
            os dados
          </strong>

          <p>
            {erro}
          </p>

          <button
            type="button"
            onClick={carregarDados}
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  // ===========================
  // PERFIL / PERMISSÃO
  // ===========================

  const usuarioEhAdmin =
    usuarioHub &&
    usuarioHub.ativo === true &&
    usuarioHub.perfil === "admin";

  // ===========================
  // BARRA SUPERIOR
  // ===========================

  function BarraSuperior() {
    return (
      <header className="barra-superior-dashboard">

        <button
          className="marca-dashboard"
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <span className="marca-dashboard-simbolo">
              <img
                className="logo-global-shapers"
                src="/global-shapers-logo.png"
                alt="Global Shapers"
              />
          </span>

          <span>
            <strong>
              Hub Fortaleza
            </strong>

            <small>
              Impact Dashboard
            </small>
          </span>
        </button>

        <UsuarioMenu
          usuario={usuario}
          usuarioEhAdmin={usuarioEhAdmin}
          aoSair={fazerLogout}
        />

      </header>
    );
  }

  // ===========================
  // ÁREA ADMINISTRATIVA
  // ===========================

  if (paginaAdmin) {
    if (!usuarioEhAdmin) {
      return (
        <>
          <BarraSuperior />

          <main className="estado-pagina">
            <div className="estado-erro">
              <strong>
                Acesso não autorizado
              </strong>

              <p>
                Sua conta não possui
                permissão para acessar
                a área administrativa.
              </p>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "/";
                }}
              >
                Voltar ao dashboard
              </button>
            </div>
          </main>
        </>
      );
    }

    // ===========================
    // GERENCIAR ENCONTRO
    // ===========================

    const parametrosAdmin =
      new URLSearchParams(
        window.location.search
      );

    const idEncontroGerenciar =
      Number(
        parametrosAdmin.get("encontro")
      );

    if (idEncontroGerenciar) {
      const encontroGerenciado =
        encontros.find(
          (encontro) =>
            encontro.id ===
            idEncontroGerenciar
        );

      if (!encontroGerenciado) {
        return (
          <>
            <BarraSuperior />

            <main className="estado-pagina">
              <div className="estado-erro">
                <strong>
                  Encontro não encontrado
                </strong>

                <p>
                  O encontro informado
                  não existe ou não está
                  mais disponível.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href =
                      "/admin";
                  }}
                >
                  Voltar
                </button>
              </div>
            </main>
          </>
        );
      }

      const participantesGerenciados =
        participantes.filter(
          (participante) =>
            participante.id_encontro ===
            idEncontroGerenciar
        );

      const evidenciasGerenciadas =
        evidencias.filter(
          (evidencia) =>
            evidencia.id_encontro ===
            idEncontroGerenciar
        );

      return (
        <>
          <BarraSuperior />

          <GerenciarEncontro
            encontro={
              encontroGerenciado
            }
            participantes={
              participantesGerenciados
            }
            evidencias={
              evidenciasGerenciadas
            }
            aoAtualizarDados={
              carregarDados
            }
          />
        </>
      );
    }

    // ===========================
    // ADMIN GERAL
    // ===========================

    return (
      <>
        <BarraSuperior />

        <Admin
          usuarioHub={usuarioHub}
          encontros={encontros}
          participantes={participantes}
          aoAtualizarDados={
            carregarDados
          }
        />
      </>
    );
  }

  // ===========================
  // SEM ENCONTROS
  // ===========================

  if (encontros.length === 0) {
    return (
      <>
        <BarraSuperior />

        <main className="estado-pagina">
          <div className="estado-vazio-dashboard">
            <strong>
              Nenhum encontro encontrado
            </strong>

            <p>
              Cadastre pelo menos um
              encontro para visualizar
              o dashboard.
            </p>
          </div>
        </main>
      </>
    );
  }

  // ===========================
  // ENCONTRO SELECIONADO
  // ===========================

  const encontroSelecionado =
    encontros.find(
      (encontro) =>
        encontro.id ===
        idEncontroSelecionado
    );

  const dadosDoEncontro =
    participantes.filter(
      (participante) =>
        participante.id_encontro ===
        idEncontroSelecionado
    );

  const evidenciasDoEncontro =
    evidencias.filter(
      (evidencia) =>
        evidencia.id_encontro ===
        idEncontroSelecionado
    );

  // ===========================
  // CABEÇALHO
  // ===========================

  const tituloEncontro =
    encontroSelecionado?.titulo ??
    "Encontro Presencial do Hub Fortaleza";

  function formatarData(data) {
    if (!data) {
      return "Data não encontrada";
    }

    const [ano, mes, dia] =
      data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  const dataEncontro =
    formatarData(
      encontroSelecionado?.data_encontro
    );

  const localEncontro =
    encontroSelecionado?.local ??
    "Local não informado";

  // ===========================
  // DASHBOARD
  // ===========================

  return (
    <>
      <BarraSuperior />

      <main className="dashboard">

        <SeletorEncontro
          encontros={encontros}
          idSelecionado={
            idEncontroSelecionado
          }
          aoSelecionar={
            setIdEncontroSelecionado
          }
        />

        <header className="cabecalho-dashboard">
          <h1>
            {tituloEncontro}
          </h1>

          <p>
            {dataEncontro}
            {" · "}
            {localEncontro}
          </p>
        </header>

        <section className="resumo-encontro">

          <ListaParticipantes
            dados={dadosDoEncontro}
          />

          <NumeroParticipantes
            total={
              dadosDoEncontro.length
            }
          />

        </section>

        <section className="perfil-participantes">

          <h2 className="titulo-secao">
            Perfil dos participantes
          </h2>

          <div className="grade-perfil">

            <Genero
              dados={dadosDoEncontro}
            />

            <Raca
              dados={dadosDoEncontro}
            />

            <FaixaEtaria
              dados={dadosDoEncontro}
            />

            <Escolaridade
              dados={dadosDoEncontro}
            />

            <Renda
              dados={dadosDoEncontro}
            />

            <Deficiencia
              dados={dadosDoEncontro}
            />

            <AreaProfissional
              dados={dadosDoEncontro}
            />

            <VinculoProfissional
              dados={dadosDoEncontro}
            />

          </div>

        </section>

        <section className="dados-encontro">

          <h2 className="titulo-secao">
            Informações do encontro
          </h2>

          <div className="linha-resumo-encontro">

            <Gastos
              dados={dadosDoEncontro}
            />

            <Transporte
              dados={dadosDoEncontro}
            />

          </div>

          <Bairros
            dados={dadosDoEncontro}
          />

          <Evidencias
            evidencias={
              evidenciasDoEncontro
            }
          />

        </section>

      </main>
    </>
  );
}

export default App;