import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function GraficoBarrasPerfil({
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

  const alturaGrafico =
    Math.max(
      105,
      itens.length * 28
    );

  return (
    <article className="card card-perfil">
      <h3>{titulo}</h3>

      {total === 0 ? (
        <p className="sem-dados">
          Nenhum dado disponível.
        </p>
      ) : (
        <>
          <div
            className="grafico-barras-perfil"
            style={{
              height:
                alturaGrafico,
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={itens}
                layout="vertical"
                margin={{
                  top: 4,
                  right: 8,
                  bottom: 4,
                  left: 0,
                }}
              >
                <CartesianGrid
                  horizontal={false}
                  strokeDasharray="3 3"
                />

                <XAxis
                  type="number"
                  hide
                  allowDecimals={false}
                />

                <YAxis
                  type="category"
                  dataKey="nome"
                  width={0}
                  hide
                />

                <Tooltip
                  cursor={{
                    fill:
                      "rgba(37, 99, 235, 0.05)",
                  }}
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

                <Bar
                  dataKey="valor"
                  fill="#2563eb"
                  radius={[
                    0,
                    6,
                    6,
                    0,
                  ]}
                  barSize={13}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lista-resumo-perfil">
            {itens.map(
              (item) => (
                <div
                  className="linha-resumo-perfil"
                  key={item.nome}
                >
                  <span>
                    {item.nome}
                  </span>

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

export default GraficoBarrasPerfil;