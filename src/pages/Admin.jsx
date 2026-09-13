import { useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Copy,
  Edit3,
  MapPin,
  Plus,
  Settings,
  Users,
  X,
} from "lucide-react";

import {
  atualizarEncontro,
  criarEncontro,
} from "../services/dados";

function formatarData(data) {
  if (!data) {
    return "";
  }

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

function Admin({
  usuarioHub,
  encontros,
  participantes,
  aoAtualizarDados,
}) {
  const [titulo, setTitulo] = useState("");
  const [dataEncontro, setDataEncontro] =
    useState("");
  const [local, setLocal] = useState("");

  const [salvando, setSalvando] =
    useState(false);

  const [erro, setErro] =
    useState("");

  const [encontroCriado, setEncontroCriado] =
    useState(null);

  const [encontroEditando, setEncontroEditando] =
    useState(null);

  const [tituloEdicao, setTituloEdicao] =
    useState("");

  const [dataEdicao, setDataEdicao] =
    useState("");

  const [localEdicao, setLocalEdicao] =
    useState("");

  const [salvandoEdicao, setSalvandoEdicao] =
    useState(false);

  async function cadastrarEncontro(evento) {
    evento.preventDefault();

    try {
      setSalvando(true);
      setErro("");
      setEncontroCriado(null);

      const novoEncontro =
        await criarEncontro({
          titulo: titulo.trim(),
          data_encontro: dataEncontro,
          local: local.trim(),
        });

      setEncontroCriado(novoEncontro);

      setTitulo("");
      setDataEncontro("");
      setLocal("");

      await aoAtualizarDados();
    } catch (erroCadastro) {
      console.error(
        "Erro ao cadastrar encontro:",
        erroCadastro
      );

      setErro(
        "Não foi possível cadastrar o encontro."
      );
    } finally {
      setSalvando(false);
    }
  }

  function iniciarEdicao(encontro) {
    setEncontroEditando(encontro);

    setTituloEdicao(encontro.titulo);
    setDataEdicao(encontro.data_encontro);
    setLocalEdicao(encontro.local);
  }

  function cancelarEdicao() {
    setEncontroEditando(null);
    setTituloEdicao("");
    setDataEdicao("");
    setLocalEdicao("");
  }

  async function salvarEdicao(evento) {
    evento.preventDefault();

    try {
      setSalvandoEdicao(true);
      setErro("");

      await atualizarEncontro(
        encontroEditando.id,
        {
          titulo: tituloEdicao.trim(),
          data_encontro: dataEdicao,
          local: localEdicao.trim(),
        }
      );

      cancelarEdicao();

      await aoAtualizarDados();
    } catch (erroEdicao) {
      console.error(
        "Erro ao editar encontro:",
        erroEdicao
      );

      setErro(
        "Não foi possível atualizar o encontro."
      );
    } finally {
      setSalvandoEdicao(false);
    }
  }

  async function copiarLink(idEncontro) {
    const link = `${window.location.origin}/participar?id=${idEncontro}`;

    await navigator.clipboard.writeText(link);
  }

  function quantidadeParticipantes(idEncontro) {
    return participantes.filter(
      (participante) =>
        participante.id_encontro === idEncontro
    ).length;
  }

  function gerenciarEncontro(idEncontro) {
    window.location.href =
      `/admin?encontro=${idEncontro}`;
  }

  const linkParticipacaoCriado =
    encontroCriado
      ? `${window.location.origin}/participar?id=${encontroCriado.id}`
      : "";

  return (
    <main className="pagina-admin">
      <section className="cabecalho-admin">
        <div>
          <span>Administração</span>

          <h1>
            Dashboard Hub Fortaleza
          </h1>

          <p>
            Olá, {usuarioHub?.nome}.
          </p>
        </div>
      </section>

      <section className="card-admin">
        <div className="titulo-card-admin">
          <span className="icone-admin">
            <Plus size={22} />
          </span>

          <div>
            <h2>Novo encontro</h2>

            <p>
              Cadastre um encontro para gerar o
              link de participação.
            </p>
          </div>
        </div>

        <form
          className="formulario-admin"
          onSubmit={cadastrarEncontro}
        >
          <label>
            Título do encontro *

            <input
              type="text"
              value={titulo}
              onChange={(evento) =>
                setTitulo(evento.target.value)
              }
              required
            />
          </label>

          <div className="grade-admin">
            <label>
              Data *

              <div className="campo-admin-com-icone">
                <CalendarDays size={18} />

                <input
                  type="date"
                  value={dataEncontro}
                  onChange={(evento) =>
                    setDataEncontro(
                      evento.target.value
                    )
                  }
                  required
                />
              </div>
            </label>

            <label>
              Local *

              <div className="campo-admin-com-icone">
                <MapPin size={18} />

                <input
                  type="text"
                  value={local}
                  onChange={(evento) =>
                    setLocal(evento.target.value)
                  }
                  required
                />
              </div>
            </label>
          </div>

          {erro && (
            <p className="mensagem-erro-formulario">
              {erro}
            </p>
          )}

          <button
            className="botao-admin-principal"
            type="submit"
            disabled={salvando}
          >
            <Plus size={18} />

            {salvando
              ? "Cadastrando..."
              : "Cadastrar encontro"}
          </button>
        </form>

        {encontroCriado && (
          <div className="encontro-criado-admin">
            <div className="sucesso-admin">
              <CheckCircle2 size={21} />

              <div>
                <strong>
                  Encontro criado com sucesso
                </strong>

                <span>
                  ID #{encontroCriado.id}
                </span>
              </div>
            </div>

            <div className="link-participacao-admin">
              <div>
                <span>
                  Link de participação
                </span>

                <strong>
                  {linkParticipacaoCriado}
                </strong>
              </div>

              <button
                type="button"
                onClick={() =>
                  copiarLink(
                    encontroCriado.id
                  )
                }
              >
                <Copy size={18} />
                Copiar
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="card-admin lista-encontros-admin">
        <div className="titulo-card-admin">
          <span className="icone-admin">
            <CalendarDays size={22} />
          </span>

          <div>
            <h2>
              Encontros cadastrados
            </h2>

            <p>
              Consulte, edite ou gerencie
              participantes e evidências.
            </p>
          </div>
        </div>

        <div className="lista-admin-encontros">
          {encontros.map((encontro) => {
            const totalParticipantes =
              quantidadeParticipantes(
                encontro.id
              );

            return (
              <article
                className="item-admin-encontro"
                key={encontro.id}
              >
                <div className="info-admin-encontro">
                  <h3>
                    {encontro.titulo}
                  </h3>

                  <div className="metadados-admin-encontro">
                    <span>
                      <CalendarDays size={15} />
                      {formatarData(
                        encontro.data_encontro
                      )}
                    </span>

                    <span>
                      <MapPin size={15} />
                      {encontro.local}
                    </span>

                    <span>
                      <Users size={15} />
                      {totalParticipantes}{" "}
                      {totalParticipantes === 1
                        ? "participante"
                        : "participantes"}
                    </span>
                  </div>
                </div>

                <div className="acoes-admin-encontro">
                  <button
                    type="button"
                    onClick={() =>
                      copiarLink(encontro.id)
                    }
                  >
                    <Copy size={16} />
                    Copiar link
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      iniciarEdicao(encontro)
                    }
                  >
                    <Edit3 size={16} />
                    Editar
                  </button>

                  <button
                    type="button"
                    className="botao-gerenciar-encontro"
                    onClick={() =>
                      gerenciarEncontro(
                        encontro.id
                      )
                    }
                  >
                    <Settings size={16} />
                    Gerenciar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {encontroEditando && (
        <div className="overlay-modal-admin">
          <section className="modal-admin">
            <div className="cabecalho-modal-admin">
              <div>
                <span>
                  Editar encontro
                </span>

                <h2>
                  {encontroEditando.titulo}
                </h2>
              </div>

              <button
                type="button"
                onClick={cancelarEdicao}
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="formulario-admin"
              onSubmit={salvarEdicao}
            >
              <label>
                Título

                <input
                  value={tituloEdicao}
                  onChange={(evento) =>
                    setTituloEdicao(
                      evento.target.value
                    )
                  }
                  required
                />
              </label>

              <div className="grade-admin">
                <label>
                  Data

                  <input
                    type="date"
                    value={dataEdicao}
                    onChange={(evento) =>
                      setDataEdicao(
                        evento.target.value
                      )
                    }
                    required
                  />
                </label>

                <label>
                  Local

                  <input
                    value={localEdicao}
                    onChange={(evento) =>
                      setLocalEdicao(
                        evento.target.value
                      )
                    }
                    required
                  />
                </label>
              </div>

              <button
                className="botao-admin-principal"
                type="submit"
                disabled={salvandoEdicao}
              >
                {salvandoEdicao
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Admin;