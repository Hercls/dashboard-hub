import CardPerfilCategorias from "./CardPerfilCategorias";
import { agruparCategorias } from "../../utils/agruparCategorias";

function Renda({ dados }) {
  const opcoesRenda = [
    "Até 1 salário mínimo",
    "De 1 a 2 salários mínimos",
    "De 2 a 5 salários mínimos",
    "De 5 a 10 salários mínimos",
    "Acima de 10 salários mínimos",
    "Prefiro não responder",
  ];

  const categorias = agruparCategorias(
    dados,
    "renda",
    opcoesRenda
  );

  return (
    <CardPerfilCategorias
      titulo="Renda familiar"
      categorias={categorias}
      tipoGrafico="barras"
    />
  );
}

export default Renda;