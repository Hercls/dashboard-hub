import { CalendarDays, ChevronDown, MapPin } from "lucide-react";

function SeletorEncontro({
  encontros,
  idSelecionado,
  aoSelecionar,
}) {
  return (
    <div className="seletor-encontro">
      <div className="icone-seletor-encontro">
        <CalendarDays size={22} />
      </div>

      <div className="conteudo-seletor-encontro">
        <label htmlFor="encontro">
          Selecionar encontro
        </label>

        <div className="campo-seletor-encontro">
          <select
            id="encontro"
            value={idSelecionado}
            onChange={(evento) =>
              aoSelecionar(Number(evento.target.value))
            }
          >
            {encontros.map((encontro) => (
              <option
                key={encontro.id}
                value={encontro.id}
              >
                {encontro.titulo} — {encontro.data_encontro}
              </option>
            ))}
          </select>

          <ChevronDown
            className="seta-seletor-encontro"
            size={18}
          />
        </div>

        <div className="informacao-local-encontro">
          <MapPin size={14} />

          <span>
            {
              encontros.find(
                (encontro) =>
                  encontro.id === idSelecionado
              )?.local
            }
          </span>
        </div>
      </div>
    </div>
  );
}

export default SeletorEncontro;