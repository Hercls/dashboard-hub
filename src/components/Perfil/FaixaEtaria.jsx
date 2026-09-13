import GraficoBarrasPerfil from "./GraficoBarrasPerfil";

const ORDEM_FAIXA_ETARIA = [
  "Até 17 anos",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55–64",
  "65+",
];

function FaixaEtaria({ dados }) {
  return (
    <GraficoBarrasPerfil
      titulo="Faixa etária"
      dados={dados}
      campo="faixa_etaria"
      ordem={ORDEM_FAIXA_ETARIA}
    />
  );
}

export default FaixaEtaria;