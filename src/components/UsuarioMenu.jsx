import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

function UsuarioMenu({
  usuario,
  usuarioEhAdmin = false,
  aoSair,
}) {
  const [aberto, setAberto] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function fecharAoClicarFora(evento) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          evento.target
        )
      ) {
        setAberto(false);
      }
    }

    document.addEventListener(
      "mousedown",
      fecharAoClicarFora
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        fecharAoClicarFora
      );
    };
  }, []);

  const nomeUsuario =
    usuario?.name ||
    usuario?.nome ||
    usuario?.email ||
    "Usuário";

  const inicial =
    nomeUsuario
      .charAt(0)
      .toUpperCase();

  function irParaDashboard() {
    window.location.href = "/";
  }

  function irParaAdmin() {
    window.location.href = "/admin";
  }

  return (
    <div
      className="usuario-menu"
      ref={menuRef}
    >
      <button
        className="usuario-menu-botao"
        type="button"
        onClick={() =>
          setAberto(
            (estadoAtual) =>
              !estadoAtual
          )
        }
      >
        <span className="usuario-avatar">
          {inicial}
        </span>

        <span className="usuario-menu-info">
          <strong>
            {nomeUsuario}
          </strong>

          {usuario?.email && (
            <small>
              {usuario.email}
            </small>
          )}
        </span>

        <ChevronDown
          size={17}
          className={
            aberto
              ? "icone-menu-aberto"
              : ""
          }
        />
      </button>

      {aberto && (
        <div className="usuario-menu-dropdown">

          <div className="usuario-menu-cabecalho">
            <span className="usuario-avatar usuario-avatar-grande">
              {inicial}
            </span>

            <div>
              <strong>
                {nomeUsuario}
              </strong>

              {usuario?.email && (
                <span>
                  {usuario.email}
                </span>
              )}
            </div>
          </div>

          <div className="usuario-menu-separador" />

          <button
            type="button"
            onClick={irParaDashboard}
          >
            <LayoutDashboard
              size={17}
            />

            Dashboard
          </button>

          {usuarioEhAdmin && (
            <button
              type="button"
              onClick={irParaAdmin}
            >
              <Settings
                size={17}
              />

              Administração
            </button>
          )}

          <div className="usuario-menu-separador" />

          <button
            type="button"
            disabled
            className="usuario-menu-perfil"
          >
            <User size={17} />

            Minha conta
          </button>

          <button
            type="button"
            className="usuario-menu-sair"
            onClick={aoSair}
          >
            <LogOut size={17} />

            Sair
          </button>

        </div>
      )}
    </div>
  );
}

export default UsuarioMenu;