import CardPerfilCategorias from "./CardPerfilCategorias";
import { agruparCategorias } from "../../utils/agruparCategorias";

function FaixaEtaria({ dados }) {
  const opcoesFaixaEtaria = [
    "Até 17 anos",
    "18–24",
    "25–34",
    "35–44",
    "45–54",
    "55–64",
    "65+",
  ];

  const categorias = agruparCategorias(
    dados,
    "faixa_etaria",
    opcoesFaixaEtaria
  );

  return (
    <CardPerfilCategorias
      titulo="Faixa etária"
      categorias={categorias}
      tipoGrafico="barras"
    />
  );
}

export default FaixaEtaria;