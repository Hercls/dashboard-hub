import GraficoBarrasPerfil from "./GraficoBarrasPerfil";

const ORDEM_VINCULO = [
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

function VinculoProfissional({
  dados,
}) {
  return (
    <GraficoBarrasPerfil
      titulo="Vínculo profissional"
      dados={dados}
      campo="vinculo_profissional"
      ordem={ORDEM_VINCULO}
    />
  );
}

export default VinculoProfissional;