function CardPerfilCategorias({ titulo, categorias, tipoGrafico = "retangular" }) {
  const classeGrafico =
    tipoGrafico === "pizza"
      ? "grafico-placeholder"
      : "grafico-retangular-placeholder";

  return (
    <article className="card card-perfil">
      <h3>{titulo}</h3>

      <div className={classeGrafico}>
        <span>
          {tipoGrafico === "pizza"
            ? "Gráfico de pizza"
            : "Gráfico de barras"}
        </span>
      </div>

      <div className="legenda-grafico">
        {categorias.length === 0 ? (
          <p className="sem-dados">Sem dados</p>
        ) : (
          categorias.map((categoria) => (
            <div className="item-legenda-perfil" key={categoria.nome}>
              <span>{categoria.nome}</span>

              <strong>
                {categoria.porcentagem.toFixed(0)}%
              </strong>
            </div>
          ))
        )}
      </div>
    </article>
  );
}

export default CardPerfilCategorias;