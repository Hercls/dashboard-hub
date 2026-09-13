import GraficoDonutPerfil from "./GraficoDonutPerfil";

const ORDEM_GENERO = [
  "Mulher",
  "Homem",
  "Mulher trans",
  "Homem trans",
  "Pessoa não binária",
  "Prefiro me autodescrever",
  "Prefiro não responder",
];

function Genero({ dados }) {
  return (
    <GraficoDonutPerfil
      titulo="Gênero"
      dados={dados}
      campo="genero"
      ordem={ORDEM_GENERO}
    />
  );
}

export default Genero;