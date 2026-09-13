import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CORES = [
  "#2563eb",
  "#60a5fa",
  "#f97316",
  "#8b5cf6",
  "#14b8a6",
  "#ec4899",
  "#94a3b8",
];

function GraficoDonutPerfil({
  titulo,
  dados,
  campo,
  ordem = [],
}) {
  const total = dados.length;

  const contagem = dados.reduce(
    (resultado, participante) => {
      const valor =
        participante[campo] ||
        "Não informado";

      resultado[valor] =
        (resultado[valor] || 0) + 1;

      return resultado;
    },
    {}
  );

  let itens = Object.entries(contagem).map(
    ([nome, valor]) => ({
      nome,
      valor,

      percentual:
        total > 0
          ? Math.round(
              (valor / total) * 100
            )
          : 0,
    })
  );

  if (ordem.length > 0) {
    itens = itens.sort(
      (a, b) => {
        const indiceA =
          ordem.indexOf(a.nome);

        const indiceB =
          ordem.indexOf(b.nome);

        if (indiceA === -1) {
          return 1;
        }

        if (indiceB === -1) {
          return -1;
        }

        return indiceA - indiceB;
      }
    );
  }

  return (
    <article className="card card-perfil">
      <h3>{titulo}</h3>

      {total === 0 ? (
        <p className="sem-dados">
          Nenhum dado disponível.
        </p>
      ) : (
        <>
          <div className="grafico-perfil grafico-pizza">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={itens}
                  dataKey="valor"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={62}
                  paddingAngle={2}
                  stroke="none"
                >
                  {itens.map(
                    (item, index) => (
                      <Cell
                        key={item.nome}
                        fill={
                          CORES[
                            index %
                              CORES.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(
                    valor,
                    nome,
                    propriedades
                  ) => [
                    `${valor} (${
                      propriedades
                        .payload
                        .percentual
                    }%)`,
                    propriedades
                      .payload.nome,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="centro-donut">
              <strong>{total}</strong>

              <span>
                participantes
              </span>
            </div>
          </div>

          <div className="lista-resumo-perfil">
            {itens.map(
              (item, index) => (
                <div
                  className="linha-resumo-perfil"
                  key={item.nome}
                >
                  <div className="rotulo-resumo-perfil">
                    <span
                      className="indicador-cor"
                      style={{
                        backgroundColor:
                          CORES[
                            index %
                              CORES.length
                          ],
                      }}
                    />

                    <span>
                      {item.nome}
                    </span>
                  </div>

                  <strong>
                    {item.percentual}%
                  </strong>
                </div>
              )
            )}
          </div>
        </>
      )}
    </article>
  );
}

export default GraficoDonutPerfil;