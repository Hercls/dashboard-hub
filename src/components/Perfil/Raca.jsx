import CardPerfilCategorias from "./CardPerfilCategorias";
import { agruparCategorias } from "../../utils/agruparCategorias";

function Raca({ dados }) {
  const opcoesRaca = [
    "Branca",
    "Preta",
    "Parda",
    "Amarela",
    "Indígena",
    "Prefiro não responder",
  ];

  const categorias = agruparCategorias(
    dados,
    "raca",
    opcoesRaca
  );

  return (
    <CardPerfilCategorias
      titulo="Raça/Cor"
      categorias={categorias}
      tipoGrafico="pizza"
    />
  );
}

export default Raca;