import { useNavigate } from "react-router-dom";
import Logo from "../icons/logo";

export default function Start() {
  const navigate = useNavigate();

  const login = (): void => {
    navigate("/login");
  };

  const register = (): void => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-neutral-950 rounded-2xl p-8 shadow-2xl border border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <Logo size={72} showText={false} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Ticket<span className="text-amber-400">Pass</span>
            </h1>
            <p className="text-neutral-400 text-sm">
              Tu entrada al próximo evento
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={register}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Registrarse
            </button>

            <button
              onClick={login}
              className="w-full bg-transparent hover:bg-blue-800/20 text-blue-400 font-semibold py-3.5 px-6 rounded-xl border-2 border-blue-800 hover:border-blue-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Iniciar sesión
            </button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-600 font-medium">o</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          <p className="text-center text-xs text-neutral-500">
            ¿Problemas para ingresar?{" "}
            <a
              href="#"
              className="text-amber-400 hover:text-amber-300 font-medium hover:underline transition-colors"
            >
              Contactanos
            </a>
          </p>
        </div>

        <p className="text-center text-neutral-600 text-xs mt-6">
          Al continuar aceptás los términos y condiciones
        </p>
      </div>
    </div>
  );
}
