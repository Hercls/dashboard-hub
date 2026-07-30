import {
  Banknote,
  BusFront,
  Package,
  Utensils,
} from "lucide-react";

function converterParaNumero(valor) {
  if (typeof valor === "number") {
    return valor;
  }

  if (!valor) {
    return 0;
  }

  const valorLimpo = String(valor)
    .replace("R$", "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const numero = Number(valorLimpo);

  return Number.isNaN(numero) ? 0 : numero;
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function Gastos({ dados = [] }) {
  const totalAlimentacao = dados.reduce(
    (total, participante) =>
      total + converterParaNumero(participante.gasto_alimentacao),
    0
  );

  const totalTransporte = dados.reduce(
    (total, participante) =>
      total + converterParaNumero(participante.gasto_transporte),
    0
  );

  const totalMaterial = dados.reduce(
    (total, participante) =>
      total + converterParaNumero(participante.gasto_material),
    0
  );

  const totalGeral =
    totalAlimentacao +
    totalTransporte +
    totalMaterial;

  const categorias = [
    {
      nome: "Alimentação",
      valor: totalAlimentacao,
      classe: "alimentacao",
      Icone: Utensils,
    },
    {
      nome: "Transporte",
      valor: totalTransporte,
      classe: "transporte",
      Icone: BusFront,
    },
    {
      nome: "Material",
      valor: totalMaterial,
      classe: "material",
      Icone: Package,
    },
  ];

  return (
    <article className="card-gastos">
      <header className="cabecalho-card-gastos">
        <div className="titulo-card-gastos">
          <span className="icone-titulo-gastos">
            <Banknote size={22} />
          </span>

          <h2>Dinheiro movimentado</h2>
        </div>
      </header>

      <div className="total-geral-gastos">
        <strong>{formatarMoeda(totalGeral)}</strong>
        <span>Total investido no encontro</span>
      </div>

      <div className="lista-categorias-gastos">
        {categorias.map(({ nome, valor, classe, Icone }) => {
          const percentual =
            totalGeral > 0
              ? (valor / totalGeral) * 100
              : 0;

          return (
            <div className="categoria-gasto" key={nome}>
              <div className="cabecalho-categoria-gasto">
                <div className="nome-categoria-gasto">
                  <span className={`icone-categoria-gasto ${classe}`}>
                    <Icone size={18} />
                  </span>

                  <span>{nome}</span>
                </div>

                <strong>
                  {formatarMoeda(valor)}
                  <span className="separador-gasto">•</span>
                  {percentual.toFixed(0)}%
                </strong>
              </div>

              <div
                className="barra-fundo-gasto"
                role="progressbar"
                aria-label={`${nome}: ${percentual.toFixed(0)}% do total`}
                aria-valuenow={percentual}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className={`barra-gasto ${classe}`}
                  style={{
                    width: `${percentual}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default Gastos;