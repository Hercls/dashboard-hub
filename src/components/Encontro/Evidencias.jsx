import {
  ExternalLink,
  FileImage,
  FileText,
  Link2,
  Presentation,
  Video,
} from "lucide-react";

const CONFIGURACAO_TIPOS = {
  foto: {
    nome: "Foto",
    classe: "foto",
    Icone: FileImage,
  },

  documento: {
    nome: "Documento",
    classe: "documento",
    Icone: FileText,
  },

  apresentacao: {
    nome: "Apresentação",
    classe: "apresentacao",
    Icone: Presentation,
  },

  video: {
    nome: "Vídeo",
    classe: "video",
    Icone: Video,
  },

  link: {
    nome: "Link",
    classe: "link",
    Icone: Link2,
  },
};

function Evidencias({ evidencias = [] }) {
  if (evidencias.length === 0) {
    return (
      <section className="card-evidencias">
        <header className="cabecalho-evidencias">
          <div>
            <h2>Evidências do encontro</h2>

            <p>
              Documentos, imagens, apresentações e links relacionados
              ao encontro.
            </p>
          </div>

          <span className="quantidade-evidencias">
            0 registros
          </span>
        </header>

        <div className="estado-vazio-evidencias">
          <FileText size={30} />

          <strong>Nenhuma evidência cadastrada</strong>

          <span>
            Os arquivos e links deste encontro aparecerão aqui.
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="card-evidencias">
      <header className="cabecalho-evidencias">
        <div>
          <h2>Evidências do encontro</h2>

          <p>
            Documentos, imagens, apresentações e links relacionados
            ao encontro.
          </p>
        </div>

        <span className="quantidade-evidencias">
          {evidencias.length}{" "}
          {evidencias.length === 1 ? "registro" : "registros"}
        </span>
      </header>

      <div className="grade-evidencias">
        {evidencias.map((evidencia) => {
          const configuracao =
            CONFIGURACAO_TIPOS[evidencia.tipo] ??
            CONFIGURACAO_TIPOS.documento;

          const { Icone, classe, nome } = configuracao;

          return (
            <article
              className={`item-evidencia evidencia-${classe}`}
              key={evidencia.id}
            >
              <div className="topo-item-evidencia">
                <span className={`icone-evidencia ${classe}`}>
                  <Icone size={21} />
                </span>

                <span className={`tipo-evidencia ${classe}`}>
                  {nome}
                </span>
              </div>

              <div className="conteudo-item-evidencia">
                <h3>{evidencia.titulo}</h3>

                {evidencia.descricao && (
                  <p>{evidencia.descricao}</p>
                )}
              </div>

              <a
                className="acao-evidencia"
                href={evidencia.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${evidencia.titulo}`}
              >
                <span>
                  {evidencia.tipo === "link"
                    ? "Acessar link"
                    : "Ver evidência"}
                </span>

                <ExternalLink size={16} />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Evidencias;