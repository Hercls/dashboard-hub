import CardPerfilCategorias from "./CardPerfilCategorias";
import { agruparCategorias } from "../../utils/agruparCategorias";

function Genero({ dados }) {
  const opcoesGenero = [
    "Mulher",
    "Homem",
    "Mulher trans",
    "Homem trans",
    "Pessoa não binária",
    "Prefiro não responder",
  ];

  const categorias = agruparCategorias(
    dados,
    "genero",
    opcoesGenero
  );

  return (
    <CardPerfilCategorias
      titulo="Gênero"
      categorias={categorias}
      tipoGrafico="pizza"
    />
  );
}

export default Genero;