function ListaParticipantes({ dados }) {
  return (
    <article className="card card-participantes">
      <h2>Lista de presença</h2>

      <ul className="lista-participantes">
        {dados.map((participante) => (
          <li key={participante.email}>
            <span className="circulo-participante"></span>
            {participante.nome}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ListaParticipantes;