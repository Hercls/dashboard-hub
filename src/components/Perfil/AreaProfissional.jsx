import CardPerfilCategorias from "./CardPerfilCategorias";
import { agruparCategorias } from "../../utils/agruparCategorias";

function AreaProfissional({ dados }) {
  const opcoesAreaProfissional = [
    "Tecnologia",
    "Educação",
    "Saúde",
    "Meio Ambiente",
    "Direito",
    "Engenharia",
    "Comunicação",
    "Gestão Pública",
    "Empreendedorismo",
    "Estudante",
    "Outro",
  ];

  const categorias = agruparCategorias(
    dados,
    "area_trabalho",
    opcoesAreaProfissional
  );

  return (
    <CardPerfilCategorias
      titulo="Área profissional"
      categorias={categorias}
      tipoGrafico="barras"
    />
  );
}

export default AreaProfissional;