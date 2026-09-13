import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  ClipboardList,
  MapPin,
  Send,
  UserRound,
  WalletCards,
} from "lucide-react";

import { neonClient } from "../lib/neon";

import bairrosFortalezaRaw from "../data/Bairros_de_Fortaleza.geojson?raw";

const bairrosFortaleza = JSON.parse(
  bairrosFortalezaRaw
);

const estadoInicial = {
  nome: "",
  email: "",

  genero: "",
  raca: "",
  faixa_etaria: "",
  escolaridade: "",
  renda: "",

  deficiente: "Não",
  deficiencia: "",

  area_trabalho: "",
  vinculo_profissional: "",

  bairro: "",
  transporte_usado: "",

  gasto_alimentacao: "",
  gasto_transporte: "",
  gasto_material: "",
};

function formatarData(data) {
  if (!data) {
    return "";
  }

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

function Participar() {
  const parametros = new URLSearchParams(
    window.location.search
  );

  const idEncontro = Number(
    parametros.get("id")
  );

  const [formulario, setFormulario] =
    useState(estadoInicial);

  const [encontro, setEncontro] =
    useState(null);

  const [
    carregandoEncontro,
    setCarregandoEncontro,
  ] = useState(true);

  const [enviando, setEnviando] =
    useState(false);

  const [erro, setErro] =
    useState("");

  const [sucesso, setSucesso] =
    useState(false);

  const bairrosFortalezaLista = useMemo(() => {
    const bairros = bairrosFortaleza.features
      .map(
        (feature) =>
          feature.properties.Nome
      )
      .filter(Boolean);

    return [...new Set(bairros)].sort(
      (a, b) =>
        a.localeCompare(b, "pt-BR")
    );
  }, []);

  useEffect(() => {
    async function carregarEncontro() {
      if (!idEncontro) {
        setCarregandoEncontro(false);
        return;
      }

      try {
        setCarregandoEncontro(true);
        setErro("");

        const { data, error } =
          await neonClient
            .from("encontros")
            .select(
              "id, titulo, data_encontro, local"
            )
            .eq("id", idEncontro)
            .single();

        if (error) {
          throw error;
        }

        setEncontro(data);
      } catch (erroEncontro) {
        console.error(
          "Erro ao carregar encontro:",
          erroEncontro
        );

        setErro(
          "Não foi possível identificar este encontro."
        );

        setEncontro(null);
      } finally {
        setCarregandoEncontro(false);
      }
    }

    carregarEncontro();
  }, [idEncontro]);

  function atualizarCampo(evento) {
    const { name, value } =
      evento.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();

    if (!idEncontro || !encontro) {
      setErro(
        "Encontro não identificado."
      );

      return;
    }

    try {
      setEnviando(true);
      setErro("");

      const participante = {
        id_encontro: idEncontro,

        nome:
          formulario.nome.trim(),

        email:
          formulario.email.trim(),

        genero:
          formulario.genero,

        raca:
          formulario.raca,

        faixa_etaria:
          formulario.faixa_etaria,

        escolaridade:
          formulario.escolaridade,

        renda:
          formulario.renda,

        deficiente:
          formulario.deficiente,

        deficiencia:
          formulario.deficiente === "Sim"
            ? formulario.deficiencia
            : "",

        area_trabalho:
          formulario.area_trabalho,

        vinculo_profissional:
          formulario.vinculo_profissional,

        bairro:
          formulario.bairro,

        transporte_usado:
          formulario.transporte_usado,

        gasto_alimentacao:
          Number(
            formulario.gasto_alimentacao ||
              0
          ),

        gasto_transporte:
          Number(
            formulario.gasto_transporte ||
              0
          ),

        gasto_material:
          Number(
            formulario.gasto_material ||
              0
          ),
      };

      const { error } = await neonClient
        .from("participantes")
        .insert(participante);

      if (error) {
        throw error;
      }

      setSucesso(true);

      setFormulario(
        estadoInicial
      );
    } catch (erroEnvio) {
      console.error(
        "Erro ao cadastrar participante:",
        erroEnvio
      );

      setErro(
        "Não foi possível registrar sua participação. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (!idEncontro) {
    return (
      <main className="pagina-participar">
        <section className="card-formulario-participar">
          <p className="erro-id-encontro">
            Link de participação inválido.
          </p>
        </section>
      </main>
    );
  }

  if (carregandoEncontro) {
    return (
      <main className="pagina-participar">
        <section className="card-formulario-participar">
          <div className="estado-carregamento-formulario">
            <span className="spinner" />

            <strong>
              Carregando encontro
            </strong>
          </div>
        </section>
      </main>
    );
  }

  if (!encontro) {
    return (
      <main className="pagina-participar">
        <section className="card-formulario-participar">
          <p className="erro-id-encontro">
            Este encontro não foi
            encontrado ou o link não é
            mais válido.
          </p>
        </section>
      </main>
    );
  }

  if (sucesso) {
    return (
      <main className="pagina-participar">
        <section className="card-formulario-participar">
          <div className="estado-sucesso-formulario">
            <span className="icone-sucesso-formulario">
              <CheckCircle2 size={30} />
            </span>

            <h1>
              Participação registrada!
            </h1>

            <p>
              Seus dados foram registrados
              no encontro:
            </p>

            <strong>
              {encontro.titulo}
            </strong>

            <p>
              Obrigado por participar.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pagina-participar">
      <section className="card-formulario-participar">

        <div className="cabecalho-formulario-participar">
          <span className="icone-formulario-participar">
            <ClipboardList size={26} />
          </span>

          <div>
            <h1>
              Registro de participação
            </h1>

            <p>
              Preencha as informações
              abaixo para registrar sua
              participação.
            </p>
          </div>
        </div>

        <div className="encontro-formulario">
          <div>
            <span>
              Você está registrando
              participação em:
            </span>

            <strong>
              {encontro.titulo}
            </strong>
          </div>

          <div className="detalhes-encontro-formulario">
            <span>
              {formatarData(
                encontro.data_encontro
              )}
            </span>

            <span>•</span>

            <span>
              {encontro.local}
            </span>
          </div>
        </div>

        <form
          className="formulario-participacao"
          onSubmit={enviarFormulario}
        >

          <fieldset>
            <legend>
              <UserRound size={19} />
              Identificação
            </legend>

            <div className="grade-formulario">

              <label>
                Nome completo *

                <input
                  name="nome"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                E-mail *

                <input
                  type="email"
                  name="email"
                  value={formulario.email}
                  onChange={atualizarCampo}
                  required
                />
              </label>

            </div>
          </fieldset>

          <fieldset>
            <legend>
              <UserRound size={19} />
              Perfil
            </legend>

            <div className="grade-formulario">

              <label>
                Gênero *

                <select
                  name="genero"
                  value={formulario.genero}
                  onChange={atualizarCampo}
                  required
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
                Raça/Cor *

                <select
                  name="raca"
                  value={formulario.raca}
                  onChange={atualizarCampo}
                  required
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
                Faixa etária *

                <select
                  name="faixa_etaria"
                  value={
                    formulario.faixa_etaria
                  }
                  onChange={atualizarCampo}
                  required
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
                Escolaridade *

                <select
                  name="escolaridade"
                  value={
                    formulario.escolaridade
                  }
                  onChange={atualizarCampo}
                  required
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
                Renda familiar mensal *

                <select
                  name="renda"
                  value={formulario.renda}
                  onChange={atualizarCampo}
                  required
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
                Pessoa com deficiência? *

                <select
                  name="deficiente"
                  value={
                    formulario.deficiente
                  }
                  onChange={atualizarCampo}
                  required
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

              {formulario.deficiente ===
                "Sim" && (
                <label>
                  Qual(is)
                  deficiência(s)?

                  <select
                    name="deficiencia"
                    value={
                      formulario.deficiencia
                    }
                    onChange={
                      atualizarCampo
                    }
                    required
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
                Área profissional *

                <select
                  name="area_trabalho"
                  value={
                    formulario.area_trabalho
                  }
                  onChange={atualizarCampo}
                  required
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
                Vínculo profissional *

                <select
                  name="vinculo_profissional"
                  value={
                    formulario.vinculo_profissional
                  }
                  onChange={atualizarCampo}
                  required
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

            </div>
          </fieldset>

          <fieldset>
            <legend>
              <MapPin size={19} />
              Deslocamento
            </legend>

            <div className="grade-formulario">

              <label>
                Bairro onde mora *

                <select
                  name="bairro"
                  value={formulario.bairro}
                  onChange={atualizarCampo}
                  required
                >
                  <option value="">
                    Selecione o bairro
                  </option>

                  {bairrosFortalezaLista.map(
                    (bairro) => (
                      <option
                        key={bairro}
                        value={bairro}
                      >
                        {bairro}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label>
                Transporte utilizado *

                <select
                  name="transporte_usado"
                  value={
                    formulario.transporte_usado
                  }
                  onChange={atualizarCampo}
                  required
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
          </fieldset>

          <fieldset>
            <legend>
              <WalletCards size={19} />
              Gastos relacionados ao encontro
            </legend>

            <p className="ajuda-formulario">
              Informe quanto você gastou
              para participar deste encontro.
              Caso não tenha gasto, deixe
              como R$ 0.
            </p>

            <div className="grade-formulario grade-gastos">

              <label>
                Alimentação (R$)

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="gasto_alimentacao"
                  value={
                    formulario.gasto_alimentacao
                  }
                  onChange={atualizarCampo}
                  placeholder="0,00"
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
                    formulario.gasto_transporte
                  }
                  onChange={atualizarCampo}
                  placeholder="0,00"
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
                    formulario.gasto_material
                  }
                  onChange={atualizarCampo}
                  placeholder="0,00"
                />
              </label>

            </div>
          </fieldset>

          {erro && (
            <p className="mensagem-erro-formulario">
              {erro}
            </p>
          )}

          <button
            className="botao-enviar-participacao"
            type="submit"
            disabled={enviando}
          >
            <Send size={18} />

            {enviando
              ? "Enviando..."
              : "Registrar participação"}
          </button>

        </form>

      </section>
    </main>
  );
}

export default Participar;