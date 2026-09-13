import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../icons/logo";
import { API_BASE_URL } from "../utils/config";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al crear la cuenta");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/events");
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
     
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo size={64} showText={false} />
          </Link>
        </div>

       
        <div className="bg-neutral-950 rounded-2xl p-8 shadow-2xl border border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

       
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Creá tu cuenta
            </h1>
            <p className="text-neutral-400 text-sm">
              Empezá a reservar entradas en segundos
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 flex items-start gap-2">
              <span className="text-lg leading-none">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
         
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider"
              >
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

    
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

          
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 pr-12 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-400 transition-colors p-1 rounded-md hover:bg-amber-400/10"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

        
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider"
              >
                Repetir contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repetí tu contraseña"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 pr-12 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-400 transition-colors p-1 rounded-md hover:bg-amber-400/10"
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

        
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-600 font-medium">o</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

    
          <p className="text-center text-sm text-neutral-400">
            ¿Ya tenés cuenta?{" "}
            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-300 font-semibold hover:underline transition-colors"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>

        <p className="text-center text-neutral-600 text-xs mt-6">
          Al registrarte aceptás los términos y condiciones
        </p>
      </div>
    </div>
  );
}