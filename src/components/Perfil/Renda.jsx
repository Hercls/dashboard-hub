import GraficoBarrasPerfil from "./GraficoBarrasPerfil";

const ORDEM_RENDA = [
  "Até 1 salário mínimo",
  "De 1 a 2 salários mínimos",
  "De 2 a 5 salários mínimos",
  "De 5 a 10 salários mínimos",
  "Acima de 10 salários mínimos",
  "Prefiro não responder",
];

function Renda({ dados }) {
  return (
    <GraficoBarrasPerfil
      titulo="Renda familiar"
      dados={dados}
      campo="renda"
      ordem={ORDEM_RENDA}
    />
  );
}

export default Renda;