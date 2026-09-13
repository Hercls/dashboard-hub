import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

import { authClient } from "../lib/neon";

function Login() {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  async function enviarMagicLink(evento) {
    evento.preventDefault();

    try {
      setCarregando(true);
      setErro("");

      const { error } = await authClient.signIn.magicLink({
        email,
        callbackURL: window.location.origin,
      });

      if (error) {
        throw error;
      }

      setEnviado(true);
    } catch (erroLogin) {
      console.error("Erro ao enviar Magic Link:", erroLogin);

      setErro(
        "Não foi possível enviar o link de acesso. Verifique o e-mail informado."
      );
    } finally {
      setCarregando(false);
    }
  }

  if (enviado) {
    return (
      <main className="pagina-login">
        <section className="card-login">
          <div className="cabecalho-login">
            <span className="icone-login sucesso">
              <CheckCircle2 size={28} />
            </span>

            <h1>Verifique seu e-mail</h1>

            <p>
              Enviamos um link de acesso para:
            </p>

            <strong className="email-enviado">
              {email}
            </strong>

            <p>
              O link é válido por alguns minutos.
            </p>
          </div>

          <button
            className="botao-reenviar"
            type="button"
            onClick={() => setEnviado(false)}
          >
            Usar outro e-mail
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="pagina-login">
      <section className="card-login">
        <div className="cabecalho-login">
          <span className="icone-login">
            <Mail size={26} />
          </span>

          <h1>Dashboard Hub Fortaleza</h1>

          <p>
            Informe seu e-mail para receber um link de acesso.
          </p>
        </div>

        <form
          className="formulario-login"
          onSubmit={enviarMagicLink}
        >
          <label>
            E-mail

            <div className="campo-login">
              <Mail size={18} />

              <input
                type="email"
                value={email}
                onChange={(evento) =>
                  setEmail(evento.target.value)
                }
                placeholder="seu@email.com"
                required
              />
            </div>
          </label>

          {erro && (
            <p className="mensagem-erro-login">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
          >
            <Send size={17} />

            {carregando
              ? "Enviando..."
              : "Enviar link de acesso"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;