import CardPerfilCategorias from "./CardPerfilCategorias";
import { agruparCategorias } from "../../utils/agruparCategorias";

function VinculoProfissional({ dados }) {
  const opcoesVinculo = [
    "Empregado(a)",
    "Servidor(a) público(a)",
    "Empresário(a)",
    "Autônomo(a)",
    "Freelancer",
    "Pesquisador(a)",
    "Estudante",
    "Desempregado(a)",
    "Outro",
  ];

  const categorias = agruparCategorias(
    dados,
    "vinculo_profissional",
    opcoesVinculo
  );

  return (
    <CardPerfilCategorias
      titulo="Vínculo profissional"
      categorias={categorias}
      tipoGrafico="barras"
    />
  );
}

export default VinculoProfissional;