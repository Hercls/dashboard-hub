import { useEffect, useRef } from "react";

import {
  GeoJSON,
  MapContainer,
  useMap,
} from "react-leaflet";

import bairrosFortalezaRaw from "../../data/Bairros_de_Fortaleza.geojson?raw";

const bairrosFortaleza = JSON.parse(bairrosFortalezaRaw);

const CORES_MAPA = {
  semDados: "#eff6ff",
  muitoBaixo: "#dbeafe",
  baixo: "#bfdbfe",
  medio: "#60a5fa",
  alto: "#2563eb",
  muitoAlto: "#1e3a8a",

  borda: "#f97316",
  bordaHover: "#c2410c",
};

function normalizarTexto(texto) {
  if (!texto) {
    return "";
  }

  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function contarParticipantesPorBairro(dados) {
  return dados.reduce((contagem, participante) => {
    const bairroNormalizado = normalizarTexto(
      participante.bairro
    );

    if (!bairroNormalizado) {
      return contagem;
    }

    contagem[bairroNormalizado] =
      (contagem[bairroNormalizado] || 0) + 1;

    return contagem;
  }, {});
}

function obterCor(quantidade, maiorQuantidade) {
  if (quantidade === 0 || maiorQuantidade === 0) {
    return CORES_MAPA.semDados;
  }

  const proporcao = quantidade / maiorQuantidade;

  if (proporcao <= 0.2) {
    return CORES_MAPA.muitoBaixo;
  }

  if (proporcao <= 0.4) {
    return CORES_MAPA.baixo;
  }

  if (proporcao <= 0.6) {
    return CORES_MAPA.medio;
  }

  if (proporcao <= 0.8) {
    return CORES_MAPA.alto;
  }

  return CORES_MAPA.muitoAlto;
}

/*
  Este componente ajusta automaticamente o mapa
  aos limites do GeoJSON.
*/
function AjustarLimites({ camadaGeoJson }) {
  const mapa = useMap();

  useEffect(() => {
    if (!camadaGeoJson.current) {
      return;
    }

    const limites = camadaGeoJson.current.getBounds();

    mapa.fitBounds(limites, {
      padding: [20, 20],
      animate: false,
    });

    /*
      Define os mesmos limites como limite máximo.
      Mesmo que alguma interação seja ativada depois,
      o mapa não poderá sair da área de Fortaleza.
    */
    mapa.setMaxBounds(limites.pad(0.05));
  }, [mapa, camadaGeoJson]);

  return null;
}

function Bairros({ dados }) {
  const camadaGeoJson = useRef(null);

  const participantesPorBairro =
    contarParticipantesPorBairro(dados);

  const quantidades = Object.values(
    participantesPorBairro
  );

  const maiorQuantidade =
    quantidades.length > 0
      ? Math.max(...quantidades)
      : 0;

  const bairrosComParticipantes = Object.entries(
    participantesPorBairro
  )
    .map(([bairroNormalizado, quantidade]) => {
      const participante = dados.find(
        (item) =>
          normalizarTexto(item.bairro) === bairroNormalizado
      );

      return {
        nome: participante?.bairro || bairroNormalizado,
        quantidade,
      };
    })
    .sort((a, b) => b.quantidade - a.quantidade);

  function estiloBairro(feature) {
    const nomeBairro = normalizarTexto(
      feature.properties.Nome
    );

    const quantidade =
      participantesPorBairro[nomeBairro] || 0;

    return {
      fillColor: obterCor(
        quantidade,
        maiorQuantidade
      ),
      fillOpacity: quantidade > 0 ? 0.95 : 0.65,

      color: CORES_MAPA.borda,
      weight: 1.4,
      opacity: 0.9,

      lineJoin: "round",
      lineCap: "round",
    };
  }

  function configurarInteracao(feature, layer) {
    const nomeOriginal = feature.properties.Nome;

    const nomeNormalizado = normalizarTexto(
      nomeOriginal
    );

    const quantidade =
      participantesPorBairro[nomeNormalizado] || 0;

    const textoParticipantes =
      quantidade === 1
        ? "1 participante"
        : `${quantidade} participantes`;

    layer.bindTooltip(
      `
        <div class="tooltip-bairro">
          <strong>${nomeOriginal}</strong>
          <span>${textoParticipantes}</span>
        </div>
      `,
      {
        sticky: true,
        direction: "top",
      }
    );

    layer.on({
      mouseover(evento) {
        const camada = evento.target;

        camada.setStyle({
          weight: 3,
          color: CORES_MAPA.bordaHover,
          fillOpacity: 1,
        });

        camada.bringToFront();
      },

      mouseout(evento) {
        evento.target.setStyle(
          estiloBairro(feature)
        );
      },
    });

  }

  const limitesLegenda =
    maiorQuantidade > 0
      ? [
        0,
        Math.max(1, Math.ceil(maiorQuantidade * 0.2)),
        Math.max(1, Math.ceil(maiorQuantidade * 0.4)),
        Math.max(1, Math.ceil(maiorQuantidade * 0.6)),
        Math.max(1, Math.ceil(maiorQuantidade * 0.8)),
        maiorQuantidade,
      ]
      : [0, 0, 0, 0, 0, 0];

  return (
    <article className="card card-bairros">
      <div className="cabecalho-card-bairros">
        <div>
          <h2>Bairros de origem</h2>

          <p>
            Distribuição dos participantes por bairro de
            Fortaleza
          </p>
        </div>

        <span className="total-bairros">
          {bairrosComParticipantes.length} bairros
        </span>
      </div>

      <div className="conteudo-bairros">
        <div className="mapa-bairros">
          <MapContainer
            center={[-3.79, -38.53]}
            zoom={11}
            zoomControl={false}
            attributionControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            boxZoom={false}
            keyboard={false}
            touchZoom={false}
            zoomSnap={0}
            zoomDelta={0}
            preferCanvas
          >
            <GeoJSON
              ref={camadaGeoJson}
              data={bairrosFortaleza}
              style={estiloBairro}
              onEachFeature={configurarInteracao}
            />

            <AjustarLimites
              camadaGeoJson={camadaGeoJson}
            />
          </MapContainer>
        </div>

        <aside className="painel-ranking-bairros">
          <h3>Participantes por bairro</h3>

          {bairrosComParticipantes.length === 0 ? (
            <p className="sem-dados">
              Nenhum bairro informado.
            </p>
          ) : (
            <div className="ranking-bairros">
              {bairrosComParticipantes.map(
                (bairro, index) => (
                  <div
                    className="item-ranking-bairro"
                    key={bairro.nome}
                  >
                    <span className="posicao-bairro">
                      {index + 1}º
                    </span>

                    <span className="nome-bairro">
                      {bairro.nome}
                    </span>

                    <strong>
                      {bairro.quantidade}
                    </strong>
                  </div>
                )
              )}
            </div>
          )}

          <div className="legenda-mapa-bairros">

            <h4>Quantidade de participantes</h4>

            <div className="escala-cores-bairros">
              <span
                style={{
                  backgroundColor: CORES_MAPA.semDados,
                }}
              />

              <span
                style={{
                  backgroundColor: CORES_MAPA.muitoBaixo,
                }}
              />

              <span
                style={{
                  backgroundColor: CORES_MAPA.baixo,
                }}
              />

              <span
                style={{
                  backgroundColor: CORES_MAPA.medio,
                }}
              />

              <span
                style={{
                  backgroundColor: CORES_MAPA.alto,
                }}
              />

              <span
                style={{
                  backgroundColor: CORES_MAPA.muitoAlto,
                }}
              />
            </div>

            <div className="valores-escala-bairros">
              {limitesLegenda.map((valor, index) => (
                <span key={`${valor}-${index}`}>
                  {valor}
                </span>
              ))}
            </div>

            <div className="indicacao-sem-respostas">
              <span className="amostra-sem-respostas" />
              Bairro sem participantes
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

export default Bairros;