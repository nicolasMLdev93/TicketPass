import { useState } from "react";
import { FiUser, FiMail, FiShield, FiCalendar } from "react-icons/fi";

interface UserData {
  id: number;
  name: string;
  email: string;
  role?: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export default function User_info() {
  const [user] = useState<UserData | null>(() => {
    if (typeof window === "undefined") return null;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as UserData;
    } catch {
      return null;
    }
  });

  const formatDate = (date?: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("es-UY", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Mi perfil
          </h1>

          <p className="text-neutral-400 text-sm">
            No se pudo cargar la información del usuario.
          </p>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <FiUser className="w-7 h-7 text-neutral-600" />
          </div>

          <p className="text-neutral-500 text-sm">
            No hay información de usuario disponible.
          </p>
        </div>
      </div>
    );
  }

  const role = user.role ?? "user";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Mi perfil
        </h1>

        <p className="text-neutral-400 text-sm">
          Consultá la información de tu cuenta.
        </p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-colors">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-7 border-b border-neutral-800">
            <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <FiUser className="w-9 h-9 text-amber-400" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-white truncate">
                  {user.name}
                </h2>

                <span
                  className={`w-fit text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    role === "admin"
                      ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                      : "bg-neutral-800/50 border-neutral-700 text-neutral-400"
                  }`}
                >
                  {role === "admin" ? "Administrador" : "Usuario"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <FiMail className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="pt-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-amber-400" />
                  </div>

                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    Nombre
                  </p>
                </div>

                <p className="text-white font-semibold text-sm">{user.name}</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <FiMail className="w-4 h-4 text-amber-400" />
                  </div>

                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    Correo electrónico
                  </p>
                </div>

                <p className="text-white font-semibold text-sm truncate">
                  {user.email}
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <FiShield className="w-4 h-4 text-amber-400" />
                  </div>

                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    Tipo de cuenta
                  </p>
                </div>

                <p className="text-white font-semibold text-sm">
                  {role === "admin" ? "Administrador" : "Usuario"}
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <FiCalendar className="w-4 h-4 text-amber-400" />
                  </div>

                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    Miembro desde
                  </p>
                </div>

                <p className="text-white font-semibold text-sm capitalize">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">ID de usuario</span>

              <span className="text-neutral-400 font-mono">
                #{String(user.id).padStart(6, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
