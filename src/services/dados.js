import { neonClient } from "../lib/neon";

export async function buscarEncontros() {
  const { data, error } = await neonClient
    .from("encontros")
    .select("*")
    .order("data_encontro", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Erro ao buscar encontros no Neon:",
      error
    );

    throw error;
  }

  return data;
}

export async function buscarParticipantes() {
  const { data, error } = await neonClient
    .from("participantes")
    .select("*")
    .order("id", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Erro ao buscar participantes no Neon:",
      error
    );

    throw error;
  }

  return data;
}

export async function buscarEvidencias() {
  const { data, error } = await neonClient
    .from("evidencias")
    .select("*")
    .order("id", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Erro ao buscar evidências no Neon:",
      error
    );

    throw error;
  }

  return data;
}

export async function buscarUsuarioHub() {
  const { data, error } = await neonClient
    .from("usuarios_hub")
    .select("id, nome, email, ativo, perfil")
    .single();

  if (error) {
    console.error(
      "Erro ao buscar usuário do Hub:",
      error
    );

    throw error;
  }

  return data;
}

export async function criarEncontro(novoEncontro) {
  const { data, error } = await neonClient
    .from("encontros")
    .insert(novoEncontro)
    .select()
    .single();

  if (error) {
    console.error(
      "Erro ao criar encontro:",
      error
    );

    throw error;
  }

  return data;
}

export async function atualizarEncontro(id, dadosAtualizados) {
  const { data, error } = await neonClient
    .from("encontros")
    .update(dadosAtualizados)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Erro ao atualizar encontro:",
      error
    );

    throw error;
  }

  return data;
}

export async function excluirEncontro(id) {
  const { error } = await neonClient
    .from("encontros")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Erro ao excluir encontro:",
      error
    );

    throw error;
  }
}

export async function excluirParticipante(id) {
  const { error } = await neonClient
    .from("participantes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Erro ao excluir participante:",
      error
    );

    throw error;
  }
}

export async function criarEvidencia(novaEvidencia) {
  const { data, error } = await neonClient
    .from("evidencias")
    .insert(novaEvidencia)
    .select()
    .single();

  if (error) {
    console.error(
      "Erro ao criar evidência:",
      error
    );

    throw error;
  }

  return data;
}

export async function atualizarEvidencia(
  id,
  dadosAtualizados
) {
  const { data, error } = await neonClient
    .from("evidencias")
    .update(dadosAtualizados)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Erro ao atualizar evidência:",
      error
    );

    throw error;
  }

  return data;
}

export async function excluirEvidencia(id) {
  const { error } = await neonClient
    .from("evidencias")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Erro ao excluir evidência:",
      error
    );

    throw error;
  }
}

export async function atualizarParticipante(
  id,
  dadosAtualizados
) {
  const { data, error } = await neonClient
    .from("participantes")
    .update(dadosAtualizados)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Erro ao atualizar participante:",
      error
    );

    throw error;
  }

  return data;
}