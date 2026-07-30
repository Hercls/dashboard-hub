const opcoesTransporte = [
  {
    nome: "Ônibus",
    icone: "🚌",
  },
  {
    nome: "Metrô/VLT",
    icone: "🚇",
  },
  {
    nome: "Carro (particular)",
    icone: "🚗",
  },
  {
    nome: "Moto (particular)",
    icone: "🏍️",
  },
  {
    nome: "Bicicleta",
    icone: "🚲",
  },
  {
    nome: "Carro (aplicativo)",
    icone: "🚙",
  },
  {
    nome: "Moto (aplicativo)",
    icone: "🛵",
  },
  {
    nome: "Outro",
    icone: "🚐",
  },
];

function normalizarTransporte(resposta) {
  if (!resposta) {
    return null;
  }

  const respostaLimpa = resposta.toString().trim();

  const opcaoEncontrada = opcoesTransporte.find(
    (opcao) =>
      opcao.nome.toLowerCase() === respostaLimpa.toLowerCase()
  );

  if (opcaoEncontrada) {
    return opcaoEncontrada.nome;
  }

  if (respostaLimpa.toLowerCase().startsWith("outro")) {
    return "Outro";
  }

  return "Outro";
}

function Transporte({ dados }) {
  const totalParticipantes = dados.length;

  const ranking = opcoesTransporte
    .map((opcao) => {
      const quantidade = dados.filter((participante) => {
        const transporte = normalizarTransporte(
          participante.transporte_usado
        );

        return transporte === opcao.nome;
      }).length;

      const porcentagem =
        totalParticipantes > 0
          ? (quantidade / totalParticipantes) * 100
          : 0;

      return {
        ...opcao,
        quantidade,
        porcentagem,
      };
    })
    .filter((opcao) => opcao.quantidade > 0)
    .sort((a, b) => b.quantidade - a.quantidade);

  return (
    <article className="card card-transporte">
      <div className="cabecalho-card-transporte">
        <div>
          <h2>Meio de transporte utilizado</h2>

          <p>
            Transporte utilizado pelos participantes para chegar
            ao encontro
          </p>
        </div>

        <span className="total-respostas-transporte">
          {totalParticipantes} respostas
        </span>
      </div>

      {ranking.length === 0 ? (
        <div className="transporte-sem-dados">
          Nenhuma informação de transporte disponível.
        </div>
      ) : (
        <div className="ranking-transporte">
          {ranking.map((transporte, index) => (
            <div
              className="item-ranking-transporte"
              key={transporte.nome}
            >
              <div className="posicao-transporte">
                {index + 1}º
              </div>

              <div className="icone-transporte" aria-hidden="true">
                {transporte.icone}
              </div>

              <div className="informacoes-transporte">
                <div className="linha-superior-transporte">
                  <span className="nome-transporte">
                    {transporte.nome}
                  </span>

                  <span className="resultado-transporte">
                    <strong>
                      {transporte.porcentagem.toFixed(0)}%
                    </strong>

                    <small>
                      {transporte.quantidade}{" "}
                      {transporte.quantidade === 1
                        ? "pessoa"
                        : "pessoas"}
                    </small>
                  </span>
                </div>

                <div className="trilha-transporte">
                  <div
                    className="barra-transporte"
                    style={{
                      width: `${transporte.porcentagem}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default Transporte;