function NumeroParticipantes({ total }) {
  return (
    <article className="card card-total">
      <h2>Número de participantes</h2>

      <strong className="numero-participantes">
        {total}
      </strong>
    </article>
  );
}

export default NumeroParticipantes;