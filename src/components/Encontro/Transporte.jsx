import {
  Bike,
  BusFront,
  Car,
  CarTaxiFront,
  CircleEllipsis,
  Route,
  TrainFront,
} from "lucide-react";

const opcoesTransporte = [
  {
    nome: "Ônibus",
    Icone: BusFront,
  },
  {
    nome: "Metrô/VLT",
    Icone: TrainFront,
  },
  {
    nome: "Carro (particular)",
    Icone: Car,
  },
  {
    nome: "Moto (particular)",
    Icone: Route,
  },
  {
    nome: "Bicicleta",
    Icone: Bike,
  },
  {
    nome: "Carro (aplicativo)",
    Icone: CarTaxiFront,
  },
  {
    nome: "Moto (aplicativo)",
    Icone: Route,
  },
  {
    nome: "Outro",
    Icone: CircleEllipsis,
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

function Transporte({ dados = [] }) {
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

  const maiorQuantidade =
    ranking.length > 0 ? ranking[0].quantidade : 0;

  const transportesMaisUtilizados = ranking.filter(
    (transporte) =>
      transporte.quantidade === maiorQuantidade
  );

  const existeEmpate =
    transportesMaisUtilizados.length > 1;

  const resumoPrincipal =
    transportesMaisUtilizados
      .map((transporte) => transporte.nome)
      .join(", ");

  const percentualPrincipal =
    ranking.length > 0 ? ranking[0].porcentagem : 0;

  return (
    <article className="card-transporte">
      <header className="cabecalho-card-transporte">
        <div className="titulo-card-transporte">
          <span className="icone-titulo-transporte">
            <BusFront size={23} />
          </span>

          <div>
            <h2>Transporte utilizado</h2>

            <p>
              Meio de deslocamento usado pelos participantes para
              chegar ao encontro.
            </p>
          </div>
        </div>

        <span className="total-respostas-transporte">
          {totalParticipantes}{" "}
          {totalParticipantes === 1
            ? "resposta"
            : "respostas"}
        </span>
      </header>

      {ranking.length === 0 ? (
        <div className="transporte-sem-dados">
          <BusFront size={32} />

          <strong>Nenhum transporte informado</strong>

          <span>
            Os meios de deslocamento aparecerão aqui.
          </span>
        </div>
      ) : (
        <>
          <div className="resumo-principal-transporte">
            <span className="icone-resumo-transporte">
              <Route size={21} />
            </span>

            <div>
              <span className="rotulo-resumo-transporte">
                {existeEmpate
                  ? "Meios mais utilizados"
                  : "Meio mais utilizado"}
              </span>

              <strong>{resumoPrincipal}</strong>
            </div>

            <span className="percentual-resumo-transporte">
              {percentualPrincipal.toFixed(0)}%
            </span>
          </div>

          <div className="ranking-transporte">
            {ranking.map(
              (
                {
                  nome,
                  quantidade,
                  porcentagem,
                  Icone,
                },
                index
              ) => (
                <div
                  className="item-ranking-transporte"
                  key={nome}
                >
                  <span
                    className={`posicao-transporte posicao-${
                      index + 1
                    }`}
                  >
                    {index + 1}º
                  </span>

                  <span className="icone-transporte">
                    <Icone size={23} />
                  </span>

                  <div className="informacoes-transporte">
                    <div className="linha-superior-transporte">
                      <span className="nome-transporte">
                        {nome}
                      </span>

                      <strong className="resultado-transporte">
                        {quantidade}{" "}
                        {quantidade === 1
                          ? "pessoa"
                          : "pessoas"}

                        <span>•</span>

                        {porcentagem.toFixed(0)}%
                      </strong>
                    </div>

                    <div
                      className="trilha-transporte"
                      role="progressbar"
                      aria-label={`${nome}: ${porcentagem.toFixed(
                        0
                      )}%`}
                      aria-valuenow={porcentagem}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="barra-transporte"
                        style={{
                          width: `${porcentagem}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </article>
  );
}

export default Transporte;