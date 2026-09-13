import GraficoDonutPerfil from "./GraficoDonutPerfil";

const ORDEM_RACA = [
  "Branca",
  "Preta",
  "Parda",
  "Amarela",
  "Indígena",
  "Prefiro não responder",
];

function Raca({ dados }) {
  return (
    <GraficoDonutPerfil
      titulo="Raça/Cor"
      dados={dados}
      campo="raca"
      ordem={ORDEM_RACA}
    />
  );
}

export default Raca;