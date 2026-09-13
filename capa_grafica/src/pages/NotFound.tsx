import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import Logo from "../icons/logo";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 text-center">
        <div className="flex justify-center mb-10">
          <Link to="/">
            <Logo size={56} showText={false} />
          </Link>
        </div>

        <div className="bg-neutral-950 rounded-2xl p-8 shadow-2xl border border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <h2 className="text-2xl font-bold text-white mb-2">
            Página no encontrada
          </h2>
          <p className="text-neutral-400 text-sm mb-8">
            Parece que este ticket no existe o la función ya terminó.
            <br />
            ¿Querés volver a donde estabas?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <FiArrowLeft className="w-4 h-4" />
              Volver atrás
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-blue-800/20 text-blue-400 font-semibold py-3 px-6 rounded-xl border-2 border-blue-800 hover:border-blue-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <FiHome className="w-4 h-4" />
              Ir al inicio
            </Link>
          </div>
        </div>
        <p className="text-center text-neutral-600 text-xs mt-6">
          Error 404 · La página solicitada no existe
        </p>
      </div>
    </div>
  );
}
