import CardPerfilCategorias from "./CardPerfilCategorias";
import { agruparCategorias } from "../../utils/agruparCategorias";

function Escolaridade({ dados }) {
  const opcoesEscolaridade = [
    "Ensino Fundamental",
    "Ensino Médio",
    "Ensino Técnico",
    "Ensino Superior incompleto",
    "Ensino Superior completo",
    "Especialização",
    "Mestrado",
    "Doutorado",
    "Prefiro não responder",
  ];

  const categorias = agruparCategorias(
    dados,
    "escolaridade",
    opcoesEscolaridade
  );

  return (
    <CardPerfilCategorias
      titulo="Escolaridade"
      categorias={categorias}
      tipoGrafico="barras"
    />
  );
}

export default Escolaridade;