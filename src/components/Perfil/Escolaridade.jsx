import GraficoBarrasPerfil from "./GraficoBarrasPerfil";

const ORDEM_ESCOLARIDADE = [
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

function Escolaridade({ dados }) {
  return (
    <GraficoBarrasPerfil
      titulo="Escolaridade"
      dados={dados}
      campo="escolaridade"
      ordem={
        ORDEM_ESCOLARIDADE
      }
    />
  );
}

export default Escolaridade;