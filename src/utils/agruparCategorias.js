export function agruparCategorias(dados, campo, ordemCategorias = []) {
  const contagem = {};

  dados.forEach((participante) => {
    const resposta = participante[campo];

    if (
      resposta === undefined ||
      resposta === null ||
      resposta.toString().trim() === ""
    ) {
      return;
    }

    const categoria = resposta.toString().trim();

    contagem[categoria] = (contagem[categoria] || 0) + 1;
  });

  const categoriasOrdenadas = [];

  ordemCategorias.forEach((categoria) => {
    if (contagem[categoria]) {
      categoriasOrdenadas.push({
        nome: categoria,
        quantidade: contagem[categoria],
      });

      delete contagem[categoria];
    }
  });

  const categoriasExtras = Object.entries(contagem).map(
    ([nome, quantidade]) => ({
      nome,
      quantidade,
    })
  );

  const resultado = [...categoriasOrdenadas, ...categoriasExtras];

  return resultado.map((categoria) => ({
    ...categoria,
    porcentagem:
      dados.length > 0
        ? (categoria.quantidade / dados.length) * 100
        : 0,
  }));
}