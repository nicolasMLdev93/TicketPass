import { Link } from "react-router-dom";
import { FiCalendar, FiTag, FiArrowRight, FiLoader } from "react-icons/fi";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/config";

export default function DashboardHome() {
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const [events_quantity, setevents_quantity] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchEventsQuantity = async () => {
      const res = await fetch(`${API_BASE_URL}/events`);
      const data = await res.json();

      if (!cancelled) {
        setevents_quantity(data.count);
      }
    };

    fetchEventsQuantity();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    {
      label: "Próximos eventos",
      value: events_quantity,
      icon: <FiCalendar className="w-5 h-5" />,
      color: "amber",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Bienvenida */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          ¡Hola, {user?.name?.split(" ")[0] || "Usuario"}! 👋
        </h1>
        <p className="text-neutral-400 text-sm">
          Este es tu panel. Explorá eventos, revisá tus entradas y más.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 relative overflow-hidden group hover:border-amber-400/30 transition-colors"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
              <span className="text-amber-400">{stat.icon}</span>
            </div>

            {stat.value === null ? (
              <FiLoader className="w-6 h-6 text-neutral-500 animate-spin" />
            ) : (
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/events"
          className="group bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-black" />
            </div>
            <FiArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Explorar eventos
          </h3>
          <p className="text-sm text-neutral-400">
            Descubrí los próximos conciertos, obras y más.
          </p>
        </Link>

        <Link
          to="/reservations"
          className="group bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <FiTag className="w-6 h-6 text-white" />
            </div>
            <FiArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Mis tickets</h3>
          <p className="text-sm text-neutral-400">
            Consultá tus entradas y su estado actual.
          </p>
        </Link>
      </div>
    </div>
  );
}
