function Deficiencia({ dados }) {
  const totalParticipantes = dados.length;

  const totalSim = dados.filter(
    (participante) => participante.deficiente === "Sim"
  ).length;

  const totalNao = dados.filter(
    (participante) => participante.deficiente === "Não"
  ).length;

  const totalNaoResponder = dados.filter(
    (participante) =>
      participante.deficiente === "Prefiro não responder"
  ).length;

  const porcentagemSim =
    totalParticipantes > 0
      ? (totalSim / totalParticipantes) * 100
      : 0;

  const tiposDeficiencia = {};

  dados.forEach((participante) => {
    if (
      participante.deficiente !== "Sim" ||
      !participante.deficiencia
    ) {
      return;
    }

    let respostas = participante.deficiencia;

    if (!Array.isArray(respostas)) {
      respostas = respostas
        .toString()
        .split(/[,;|]/)
        .map((resposta) => resposta.trim())
        .filter(Boolean);
    }

    respostas.forEach((tipo) => {
      tiposDeficiencia[tipo] =
        (tiposDeficiencia[tipo] || 0) + 1;
    });
  });

  const categoriasDeficiencia = Object.entries(
    tiposDeficiencia
  ).map(([nome, quantidade]) => ({
    nome,
    quantidade,
  }));

  return (
    <article className="card card-perfil">
      <h3>Pessoa com deficiência</h3>

      <div className="grafico-placeholder">
        <strong className="porcentagem-destaque">
          {porcentagemSim.toFixed(0)}%
        </strong>

        <span>PcD</span>
      </div>

      <div className="legenda-grafico">
        <div className="item-legenda-perfil">
          <span>Sim</span>
          <strong>{totalSim}</strong>
        </div>

        <div className="item-legenda-perfil">
          <span>Não</span>
          <strong>{totalNao}</strong>
        </div>

        {totalNaoResponder > 0 && (
          <div className="item-legenda-perfil">
            <span>Prefiro não responder</span>
            <strong>{totalNaoResponder}</strong>
          </div>
        )}

        {categoriasDeficiencia.length > 0 && (
          <div className="tipos-deficiencia">
            <h4>Tipos informados</h4>

            {categoriasDeficiencia.map((categoria) => (
              <div
                className="item-legenda-perfil"
                key={categoria.nome}
              >
                <span>{categoria.nome}</span>
                <strong>{categoria.quantidade}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default Deficiencia;