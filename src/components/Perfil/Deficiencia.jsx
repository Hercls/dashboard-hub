import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CORES = {
  sim: "#2563eb",
  nao: "#dbeafe",
  naoResponder: "#94a3b8",
};

function Deficiencia({ dados }) {
  const total = dados.length;

  const quantidadeSim =
    dados.filter(
      (participante) =>
        participante.deficiente ===
        "Sim"
    ).length;

  const quantidadeNao =
    dados.filter(
      (participante) =>
        participante.deficiente ===
        "Não"
    ).length;

  const quantidadeNaoResponder =
    dados.filter(
      (participante) =>
        participante.deficiente ===
        "Prefiro não responder"
    ).length;

  const percentualPcd =
    total > 0
      ? Math.round(
          (quantidadeSim /
            total) *
            100
        )
      : 0;

  const dadosGrafico = [
    {
      nome: "Sim",
      valor: quantidadeSim,
      cor: CORES.sim,
    },

    {
      nome: "Não",
      valor: quantidadeNao,
      cor: CORES.nao,
    },

    {
      nome:
        "Prefiro não responder",
      valor:
        quantidadeNaoResponder,
      cor:
        CORES.naoResponder,
    },
  ].filter(
    (item) =>
      item.valor > 0
  );

  const tiposDeficiencia =
    dados
      .filter(
        (participante) =>
          participante.deficiente ===
          "Sim" &&
          participante.deficiencia
      )
      .flatMap(
        (participante) =>
          participante.deficiencia
            .split(";")
            .map(
              (tipo) =>
                tipo.trim()
            )
            .filter(Boolean)
      )
      .reduce(
        (resultado, tipo) => {
          resultado[tipo] =
            (resultado[tipo] || 0) +
            1;

          return resultado;
        },
        {}
      );

  const listaTipos =
    Object.entries(
      tiposDeficiencia
    ).sort(
      (a, b) =>
        b[1] - a[1]
    );

  return (
    <article className="card card-perfil">
      <h3>
        Pessoa com deficiência
      </h3>

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
                  data={dadosGrafico}
                  dataKey="valor"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={62}
                  paddingAngle={2}
                  stroke="none"
                >
                  {dadosGrafico.map(
                    (item) => (
                      <Cell
                        key={item.nome}
                        fill={item.cor}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="centro-donut">
              <strong>
                {percentualPcd}%
              </strong>

              <span>
                PcD
              </span>
            </div>
          </div>

          <div className="lista-resumo-perfil">
            <div className="linha-resumo-perfil">
              <div className="rotulo-resumo-perfil">
                <span
                  className="indicador-cor"
                  style={{
                    backgroundColor:
                      CORES.sim,
                  }}
                />

                <span>
                  Sim
                </span>
              </div>

              <strong>
                {quantidadeSim}
              </strong>
            </div>

            <div className="linha-resumo-perfil">
              <div className="rotulo-resumo-perfil">
                <span
                  className="indicador-cor"
                  style={{
                    backgroundColor:
                      CORES.nao,
                  }}
                />

                <span>
                  Não
                </span>
              </div>

              <strong>
                {quantidadeNao}
              </strong>
            </div>

            {quantidadeNaoResponder >
              0 && (
              <div className="linha-resumo-perfil">
                <div className="rotulo-resumo-perfil">
                  <span
                    className="indicador-cor"
                    style={{
                      backgroundColor:
                        CORES.naoResponder,
                    }}
                  />

                  <span>
                    Prefiro não responder
                  </span>
                </div>

                <strong>
                  {
                    quantidadeNaoResponder
                  }
                </strong>
              </div>
            )}
          </div>

          {listaTipos.length > 0 && (
            <div className="tipos-deficiencia">
              <strong>
                Tipos informados
              </strong>

              {listaTipos.map(
                ([tipo, quantidade]) => (
                  <div
                    key={tipo}
                    className="linha-tipo-deficiencia"
                  >
                    <span>
                      {tipo}
                    </span>

                    <strong>
                      {quantidade}
                    </strong>
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
}

export default Deficiencia;