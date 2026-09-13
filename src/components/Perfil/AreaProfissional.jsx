import GraficoBarrasPerfil from "./GraficoBarrasPerfil";

const ORDEM_AREA = [
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

function AreaProfissional({
  dados,
}) {
  return (
    <GraficoBarrasPerfil
      titulo="Área profissional"
      dados={dados}
      campo="area_trabalho"
      ordem={ORDEM_AREA}
    />
  );
}

export default AreaProfissional;