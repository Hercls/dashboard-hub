import { useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  FileText,
  Image,
  Link as LinkIcon,
  MapPin,
  Pencil,
  Plus,
  Presentation,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";

import {
  atualizarEvidencia,
  atualizarParticipante,
  criarEvidencia,
  excluirEvidencia,
  excluirParticipante,
} from "../services/dados";

import bairrosFortalezaRaw from "../data/Bairros_de_Fortaleza.geojson?raw";

const bairrosFortaleza = JSON.parse(
  bairrosFortalezaRaw
);

const bairrosFortalezaLista =
  bairrosFortaleza.features
    .map(
      (feature) =>
        feature.properties.Nome
    )
    .filter(Boolean)
    .sort((a, b) =>
      a.localeCompare(b, "pt-BR")
    );

const evidenciaInicial = {
  tipo: "foto",
  titulo: "",
  descricao: "",
  url: "",
};

function formatarData(data) {
  if (!data) {
    return "";
  }

  const [ano, mes, dia] =
    data.split("-");

  return `${dia}/${mes}/${ano}`;
}

function IconeEvidencia({ tipo }) {
  switch (tipo) {
    case "foto":
      return <Image size={18} />;

    case "documento":
      return <FileText size={18} />;

    case "apresentacao":
      return <Presentation size={18} />;

    case "video":
      return <Video size={18} />;

    default:
      return <LinkIcon size={18} />;
  }
}

function GerenciarEncontro({
  encontro,
  participantes,
  evidencias,
  aoAtualizarDados,
}) {
  // ===========================
  // PARTICIPANTE
  // ===========================

  const [
    participanteEditando,
    setParticipanteEditando,
  ] = useState(null);

  const [
    formularioParticipante,
    setFormularioParticipante,
  ] = useState(null);

  const [
    salvandoParticipante,
    setSalvandoParticipante,
  ] = useState(false);

  const [
    erroParticipante,
    setErroParticipante,
  ] = useState("");

  // ===========================
  // EVIDÊNCIA
  // ===========================

  const [
    modalEvidenciaAberto,
    setModalEvidenciaAberto,
  ] = useState(false);

  const [
    evidenciaEditando,
    setEvidenciaEditando,
  ] = useState(null);

  const [
    formularioEvidencia,
    setFormularioEvidencia,
  ] = useState(evidenciaInicial);

  const [
    salvandoEvidencia,
    setSalvandoEvidencia,
  ] = useState(false);

  const [
    erroEvidencia,
    setErroEvidencia,
  ] = useState("");

  // ===========================
  // EXCLUIR PARTICIPANTE
  // ===========================

  async function removerParticipante(
    participante
  ) {
    const confirmar =
      window.confirm(
        `Deseja realmente excluir ${participante.nome}?`
      );

    if (!confirmar) {
      return;
    }

    try {
      await excluirParticipante(
        participante.id
      );

      await aoAtualizarDados();
    } catch (erro) {
      console.error(
        "Erro ao remover participante:",
        erro
      );

      window.alert(
        "Não foi possível excluir o participante."
      );
    }
  }

  // ===========================
  // EDITAR PARTICIPANTE
  // ===========================

  function abrirEdicaoParticipante(
    participante
  ) {
    setParticipanteEditando(
      participante
    );

    setFormularioParticipante({
      nome:
        participante.nome || "",

      email:
        participante.email || "",

      genero:
        participante.genero || "",

      raca:
        participante.raca || "",

      faixa_etaria:
        participante.faixa_etaria || "",

      escolaridade:
        participante.escolaridade || "",

      renda:
        participante.renda || "",

      deficiente:
        participante.deficiente || "Não",

      deficiencia:
        participante.deficiencia || "",

      area_trabalho:
        participante.area_trabalho || "",

      vinculo_profissional:
        participante.vinculo_profissional ||
        "",

      bairro:
        participante.bairro || "",

      transporte_usado:
        participante.transporte_usado || "",

      gasto_alimentacao:
        participante.gasto_alimentacao ?? 0,

      gasto_transporte:
        participante.gasto_transporte ?? 0,

      gasto_material:
        participante.gasto_material ?? 0,
    });

    setErroParticipante("");
  }

  function fecharEdicaoParticipante() {
    setParticipanteEditando(null);
    setFormularioParticipante(null);
    setErroParticipante("");
  }

  function atualizarCampoParticipante(
    evento
  ) {
    const { name, value } =
      evento.target;

    setFormularioParticipante(
      (dadosAtuais) => ({
        ...dadosAtuais,
        [name]: value,
      })
    );
  }

  async function salvarParticipante(
    evento
  ) {
    evento.preventDefault();

    try {
      setSalvandoParticipante(true);
      setErroParticipante("");

      await atualizarParticipante(
        participanteEditando.id,
        {
          nome:
            formularioParticipante.nome.trim(),

          email:
            formularioParticipante.email.trim(),

          genero:
            formularioParticipante.genero,

          raca:
            formularioParticipante.raca,

          faixa_etaria:
            formularioParticipante.faixa_etaria,

          escolaridade:
            formularioParticipante.escolaridade,

          renda:
            formularioParticipante.renda,

          deficiente:
            formularioParticipante.deficiente,

          deficiencia:
            formularioParticipante
              .deficiente === "Sim"
              ? formularioParticipante
                  .deficiencia
              : "",

          area_trabalho:
            formularioParticipante
              .area_trabalho,

          vinculo_profissional:
            formularioParticipante
              .vinculo_profissional,

          bairro:
            formularioParticipante.bairro,

          transporte_usado:
            formularioParticipante
              .transporte_usado,

          gasto_alimentacao:
            Number(
              formularioParticipante
                .gasto_alimentacao || 0
            ),

          gasto_transporte:
            Number(
              formularioParticipante
                .gasto_transporte || 0
            ),

          gasto_material:
            Number(
              formularioParticipante
                .gasto_material || 0
            ),
        }
      );

      fecharEdicaoParticipante();

      await aoAtualizarDados();
    } catch (erro) {
      console.error(
        "Erro ao editar participante:",
        erro
      );

      setErroParticipante(
        "Não foi possível atualizar o participante."
      );
    } finally {
      setSalvandoParticipante(false);
    }
  }

  // ===========================
  // EXCLUIR EVIDÊNCIA
  // ===========================

  async function removerEvidencia(
    evidencia
  ) {
    const confirmar =
      window.confirm(
        `Deseja realmente excluir a evidência "${evidencia.titulo}"?`
      );

    if (!confirmar) {
      return;
    }

    try {
      await excluirEvidencia(
        evidencia.id
      );

      await aoAtualizarDados();
    } catch (erro) {
      console.error(
        "Erro ao remover evidência:",
        erro
      );

      window.alert(
        "Não foi possível excluir a evidência."
      );
    }
  }

  // ===========================
  // NOVA EVIDÊNCIA
  // ===========================

  function abrirNovaEvidencia() {
    setEvidenciaEditando(null);

    setFormularioEvidencia(
      evidenciaInicial
    );

    setErroEvidencia("");

    setModalEvidenciaAberto(true);
  }

  // ===========================
  // EDITAR EVIDÊNCIA
  // ===========================

  function abrirEdicaoEvidencia(
    evidencia
  ) {
    setEvidenciaEditando(
      evidencia
    );

    setFormularioEvidencia({
      tipo:
        evidencia.tipo || "foto",

      titulo:
        evidencia.titulo || "",

      descricao:
        evidencia.descricao || "",

      url:
        evidencia.url || "",
    });

    setErroEvidencia("");

    setModalEvidenciaAberto(true);
  }

  function fecharModalEvidencia() {
    setModalEvidenciaAberto(false);
    setEvidenciaEditando(null);

    setFormularioEvidencia(
      evidenciaInicial
    );

    setErroEvidencia("");
  }

  function atualizarCampoEvidencia(
    evento
  ) {
    const { name, value } =
      evento.target;

    setFormularioEvidencia(
      (dadosAtuais) => ({
        ...dadosAtuais,
        [name]: value,
      })
    );
  }

  async function salvarEvidencia(
    evento
  ) {
    evento.preventDefault();

    try {
      setSalvandoEvidencia(true);
      setErroEvidencia("");

      const dados = {
        id_encontro:
          encontro.id,

        tipo:
          formularioEvidencia.tipo,

        titulo:
          formularioEvidencia
            .titulo
            .trim(),

        descricao:
          formularioEvidencia
            .descricao
            .trim(),

        url:
          formularioEvidencia
            .url
            .trim(),
      };

      if (evidenciaEditando) {
        await atualizarEvidencia(
          evidenciaEditando.id,
          {
            tipo:
              dados.tipo,

            titulo:
              dados.titulo,

            descricao:
              dados.descricao,

            url:
              dados.url,
          }
        );
      } else {
        await criarEvidencia(
          dados
        );
      }

      fecharModalEvidencia();

      await aoAtualizarDados();
    } catch (erro) {
      console.error(
        "Erro ao salvar evidência:",
        erro
      );

      setErroEvidencia(
        "Não foi possível salvar a evidência."
      );
    } finally {
      setSalvandoEvidencia(false);
    }
  }

  return (
    <main className="pagina-admin">

      {/* VOLTAR */}

      <button
        className="botao-voltar-admin"
        type="button"
        onClick={() => {
          window.location.href =
            "/admin";
        }}
      >
        <ArrowLeft size={17} />

        Voltar para encontros
      </button>

      {/* CABEÇALHO */}

      <section className="cabecalho-gerenciar-encontro">
        <span>
          Gerenciar encontro
        </span>

        <h1>
          {encontro.titulo}
        </h1>

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

            {participantes.length}{" "}
            {participantes.length === 1
              ? "participante"
              : "participantes"}
          </span>

        </div>
      </section>

      {/* ===========================
          PARTICIPANTES
      =========================== */}

      <section className="card-admin card-gerenciamento">

        <div className="titulo-card-admin">

          <span className="icone-admin">
            <Users size={22} />
          </span>

          <div>
            <h2>
              Participantes
            </h2>

            <p>
              Visualize, edite ou exclua
              participantes registrados neste
              encontro.
            </p>
          </div>

        </div>

        {participantes.length === 0 ? (

          <div className="estado-vazio-admin">

            <Users size={28} />

            <strong>
              Nenhum participante registrado
            </strong>

            <p>
              As respostas enviadas pelo
              formulário aparecerão aqui.
            </p>

          </div>

        ) : (

          <div className="tabela-admin-wrapper">

            <table className="tabela-admin">

              <thead>
                <tr>
                  <th>Participante</th>
                  <th>Bairro</th>
                  <th>Área</th>
                  <th>Transporte</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>

                {participantes.map(
                  (participante) => (

                    <tr
                      key={
                        participante.id
                      }
                    >

                      <td>
                        <div className="participante-admin">

                          <strong>
                            {
                              participante.nome
                            }
                          </strong>

                          <span>
                            {
                              participante.email
                            }
                          </span>

                        </div>
                      </td>

                      <td>
                        {participante.bairro ||
                          "—"}
                      </td>

                      <td>
                        {participante.area_trabalho ||
                          "—"}
                      </td>

                      <td>
                        {participante.transporte_usado ||
                          "—"}
                      </td>

                      <td>
                        <div className="acoes-tabela-admin">

                          <button
                            type="button"
                            title="Editar participante"
                            onClick={() =>
                              abrirEdicaoParticipante(
                                participante
                              )
                            }
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            className="acao-excluir"
                            title="Excluir participante"
                            onClick={() =>
                              removerParticipante(
                                participante
                              )
                            }
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

      {/* ===========================
          EVIDÊNCIAS
      =========================== */}

      <section className="card-admin card-gerenciamento">

        <div className="cabecalho-evidencias-admin">

          <div className="titulo-card-admin titulo-sem-borda">

            <span className="icone-admin">
              <FileText size={22} />
            </span>

            <div>
              <h2>
                Evidências
              </h2>

              <p>
                Fotos, documentos,
                apresentações, vídeos e links
                relacionados ao encontro.
              </p>
            </div>

          </div>

          <button
            className="botao-admin-principal"
            type="button"
            onClick={
              abrirNovaEvidencia
            }
          >
            <Plus size={17} />

            Adicionar evidência
          </button>

        </div>

        {evidencias.length === 0 ? (

          <div className="estado-vazio-admin">

            <FileText size={28} />

            <strong>
              Nenhuma evidência cadastrada
            </strong>

            <p>
              Adicione registros que comprovem
              e documentem a realização deste
              encontro.
            </p>

          </div>

        ) : (

          <div className="lista-evidencias-admin">

            {evidencias.map(
              (evidencia) => (

                <article
                  className="item-evidencia-admin"
                  key={
                    evidencia.id
                  }
                >

                  <span className="icone-tipo-evidencia">
                    <IconeEvidencia
                      tipo={
                        evidencia.tipo
                      }
                    />
                  </span>

                  <div className="conteudo-evidencia-admin">

                    <span className="tipo-evidencia-admin">
                      {
                        evidencia.tipo
                      }
                    </span>

                    <strong>
                      {
                        evidencia.titulo
                      }
                    </strong>

                    {evidencia.descricao && (
                      <p>
                        {
                          evidencia.descricao
                        }
                      </p>
                    )}

                  </div>

                  <div className="acoes-evidencia-admin">

                    {evidencia.url && (
                      <a
                        href={
                          evidencia.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        title="Abrir evidência"
                      >
                        <ExternalLink
                          size={16}
                        />
                      </a>
                    )}

                    <button
                      type="button"
                      title="Editar evidência"
                      onClick={() =>
                        abrirEdicaoEvidencia(
                          evidencia
                        )
                      }
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      className="acao-excluir"
                      title="Excluir evidência"
                      onClick={() =>
                        removerEvidencia(
                          evidencia
                        )
                      }
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

      {/* ===========================
          MODAL PARTICIPANTE
      =========================== */}

      {participanteEditando &&
        formularioParticipante && (

          <div className="overlay-modal-admin">

            <section className="modal-admin modal-participante-admin">

              <div className="cabecalho-modal-admin">

                <div>
                  <span>
                    Editar participante
                  </span>

                  <h2>
                    {
                      participanteEditando.nome
                    }
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={
                    fecharEdicaoParticipante
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <form
                className="formulario-admin"
                onSubmit={
                  salvarParticipante
                }
              >

                <div className="grade-admin">

                  <label>
                    Nome *

                    <input
                      name="nome"
                      value={
                        formularioParticipante.nome
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                      required
                    />
                  </label>

                  <label>
                    E-mail *

                    <input
                      type="email"
                      name="email"
                      value={
                        formularioParticipante.email
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                      required
                    />
                  </label>

                  <label>
                    Gênero

                    <select
                      name="genero"
                      value={
                        formularioParticipante.genero
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Mulher
                      </option>

                      <option>
                        Homem
                      </option>

                      <option>
                        Mulher trans
                      </option>

                      <option>
                        Homem trans
                      </option>

                      <option>
                        Pessoa não binária
                      </option>

                      <option>
                        Prefiro me autodescrever
                      </option>

                      <option>
                        Prefiro não responder
                      </option>
                    </select>
                  </label>

                  <label>
                    Raça/Cor

                    <select
                      name="raca"
                      value={
                        formularioParticipante.raca
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Branca
                      </option>

                      <option>
                        Preta
                      </option>

                      <option>
                        Parda
                      </option>

                      <option>
                        Amarela
                      </option>

                      <option>
                        Indígena
                      </option>

                      <option>
                        Prefiro não responder
                      </option>
                    </select>
                  </label>

                  <label>
                    Faixa etária

                    <select
                      name="faixa_etaria"
                      value={
                        formularioParticipante
                          .faixa_etaria
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Até 17 anos
                      </option>

                      <option>
                        18–24
                      </option>

                      <option>
                        25–34
                      </option>

                      <option>
                        35–44
                      </option>

                      <option>
                        45–54
                      </option>

                      <option>
                        55–64
                      </option>

                      <option>
                        65+
                      </option>
                    </select>
                  </label>

                  <label>
                    Escolaridade

                    <select
                      name="escolaridade"
                      value={
                        formularioParticipante
                          .escolaridade
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Ensino Fundamental
                      </option>

                      <option>
                        Ensino Médio
                      </option>

                      <option>
                        Ensino Técnico
                      </option>

                      <option>
                        Ensino Superior incompleto
                      </option>

                      <option>
                        Ensino Superior completo
                      </option>

                      <option>
                        Especialização
                      </option>

                      <option>
                        Mestrado
                      </option>

                      <option>
                        Doutorado
                      </option>

                      <option>
                        Prefiro não responder
                      </option>
                    </select>
                  </label>

                  <label>
                    Renda

                    <select
                      name="renda"
                      value={
                        formularioParticipante.renda
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Até 1 salário mínimo
                      </option>

                      <option>
                        De 1 a 2 salários mínimos
                      </option>

                      <option>
                        De 2 a 5 salários mínimos
                      </option>

                      <option>
                        De 5 a 10 salários mínimos
                      </option>

                      <option>
                        Acima de 10 salários mínimos
                      </option>

                      <option>
                        Prefiro não responder
                      </option>
                    </select>
                  </label>

                  <label>
                    Pessoa com deficiência?

                    <select
                      name="deficiente"
                      value={
                        formularioParticipante
                          .deficiente
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option>
                        Não
                      </option>

                      <option>
                        Sim
                      </option>

                      <option>
                        Prefiro não responder
                      </option>
                    </select>
                  </label>

                  {formularioParticipante
                    .deficiente === "Sim" && (

                    <label>
                      Deficiência

                      <select
                        name="deficiencia"
                        value={
                          formularioParticipante
                            .deficiencia
                        }
                        onChange={
                          atualizarCampoParticipante
                        }
                      >
                        <option value="">
                          Selecione
                        </option>

                        <option>
                          Física
                        </option>

                        <option>
                          Auditiva
                        </option>

                        <option>
                          Visual
                        </option>

                        <option>
                          Intelectual
                        </option>

                        <option>
                          Psicossocial
                        </option>

                        <option>
                          Outra
                        </option>

                        <option>
                          Prefiro não informar
                        </option>
                      </select>
                    </label>

                  )}

                  <label>
                    Área profissional

                    <select
                      name="area_trabalho"
                      value={
                        formularioParticipante
                          .area_trabalho
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Tecnologia
                      </option>

                      <option>
                        Educação
                      </option>

                      <option>
                        Saúde
                      </option>

                      <option>
                        Meio Ambiente
                      </option>

                      <option>
                        Direito
                      </option>

                      <option>
                        Engenharia
                      </option>

                      <option>
                        Comunicação
                      </option>

                      <option>
                        Gestão Pública
                      </option>

                      <option>
                        Empreendedorismo
                      </option>

                      <option>
                        Estudante
                      </option>

                      <option>
                        Outro
                      </option>
                    </select>
                  </label>

                  <label>
                    Vínculo profissional

                    <select
                      name="vinculo_profissional"
                      value={
                        formularioParticipante
                          .vinculo_profissional
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Empregado(a)
                      </option>

                      <option>
                        Servidor(a) público(a)
                      </option>

                      <option>
                        Empresário(a)
                      </option>

                      <option>
                        Autônomo(a)
                      </option>

                      <option>
                        Freelancer
                      </option>

                      <option>
                        Pesquisador(a)
                      </option>

                      <option>
                        Estudante
                      </option>

                      <option>
                        Desempregado(a)
                      </option>

                      <option>
                        Outro
                      </option>
                    </select>
                  </label>

                  <label>
                    Bairro

                    <select
                      name="bairro"
                      value={
                        formularioParticipante.bairro
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      {bairrosFortalezaLista.map(
                        (bairro) => (
                          <option
                            value={bairro}
                            key={bairro}
                          >
                            {bairro}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  <label>
                    Transporte utilizado

                    <select
                      name="transporte_usado"
                      value={
                        formularioParticipante
                          .transporte_usado
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    >
                      <option value="">
                        Selecione
                      </option>

                      <option>
                        Ônibus
                      </option>

                      <option>
                        Metrô/VLT
                      </option>

                      <option>
                        Carro (particular)
                      </option>

                      <option>
                        Moto (particular)
                      </option>

                      <option>
                        Bicicleta
                      </option>

                      <option>
                        Carro (aplicativo)
                      </option>

                      <option>
                        Moto (aplicativo)
                      </option>

                      <option>
                        Outro
                      </option>
                    </select>
                  </label>

                </div>

                <div className="grade-admin grade-gastos-admin">

                  <label>
                    Alimentação (R$)

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="gasto_alimentacao"
                      value={
                        formularioParticipante
                          .gasto_alimentacao
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    />
                  </label>

                  <label>
                    Transporte (R$)

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="gasto_transporte"
                      value={
                        formularioParticipante
                          .gasto_transporte
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    />
                  </label>

                  <label>
                    Material (R$)

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="gasto_material"
                      value={
                        formularioParticipante
                          .gasto_material
                      }
                      onChange={
                        atualizarCampoParticipante
                      }
                    />
                  </label>

                </div>

                {erroParticipante && (

                  <p className="mensagem-erro-formulario">
                    {erroParticipante}
                  </p>

                )}

                <button
                  className="botao-admin-principal"
                  type="submit"
                  disabled={
                    salvandoParticipante
                  }
                >
                  {salvandoParticipante
                    ? "Salvando..."
                    : "Salvar alterações"}
                </button>

              </form>

            </section>

          </div>

        )}

      {/* ===========================
          MODAL EVIDÊNCIA
      =========================== */}

      {modalEvidenciaAberto && (

        <div className="overlay-modal-admin">

          <section className="modal-admin">

            <div className="cabecalho-modal-admin">

              <div>

                <span>
                  {evidenciaEditando
                    ? "Editar evidência"
                    : "Nova evidência"}
                </span>

                <h2>
                  {evidenciaEditando
                    ? evidenciaEditando.titulo
                    : "Adicionar evidência"}
                </h2>

              </div>

              <button
                type="button"
                onClick={
                  fecharModalEvidencia
                }
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="formulario-admin"
              onSubmit={
                salvarEvidencia
              }
            >

              <label>
                Tipo *

                <select
                  name="tipo"
                  value={
                    formularioEvidencia.tipo
                  }
                  onChange={
                    atualizarCampoEvidencia
                  }
                  required
                >
                  <option value="foto">
                    Foto
                  </option>

                  <option value="documento">
                    Documento
                  </option>

                  <option value="apresentacao">
                    Apresentação
                  </option>

                  <option value="video">
                    Vídeo
                  </option>

                  <option value="link">
                    Link
                  </option>
                </select>
              </label>

              <label>
                Título *

                <input
                  type="text"
                  name="titulo"
                  value={
                    formularioEvidencia.titulo
                  }
                  onChange={
                    atualizarCampoEvidencia
                  }
                  required
                />
              </label>

              <label>
                Descrição

                <textarea
                  name="descricao"
                  value={
                    formularioEvidencia.descricao
                  }
                  onChange={
                    atualizarCampoEvidencia
                  }
                  rows="4"
                  placeholder="Descreva brevemente esta evidência."
                />
              </label>

              <label>
                URL *

                <input
                  type="url"
                  name="url"
                  value={
                    formularioEvidencia.url
                  }
                  onChange={
                    atualizarCampoEvidencia
                  }
                  placeholder="https://..."
                  required
                />
              </label>

              {erroEvidencia && (

                <p className="mensagem-erro-formulario">
                  {erroEvidencia}
                </p>

              )}

              <button
                className="botao-admin-principal"
                type="submit"
                disabled={
                  salvandoEvidencia
                }
              >
                {salvandoEvidencia
                  ? "Salvando..."
                  : evidenciaEditando
                    ? "Salvar alterações"
                    : "Adicionar evidência"}
              </button>

            </form>

          </section>

        </div>

      )}

    </main>
  );
}

export default GerenciarEncontro;