import { useState, useEffect, useMemo } from "react";
import {
  FiCalendar,
  FiMapPin,
  FiLoader,
  FiSearch,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";
import { API_BASE_URL } from "../utils/config";
import EventModal from "../components/EventModal";

const eventImages = import.meta.glob<string>("../images/*.jpg", {
  eager: true,
  import: "default",
});

const getEventImage = (eventId: number): string | null => {
  const index = ((eventId - 1) % 10) + 1;
  return eventImages[`../images/${index}.jpg`] ?? null;
};

type Event = {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  price: string | number;
  capacity: number;
  image?: string;
};

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error al cargar eventos");
        }

        if (!cancelled) setEvents(data.events);
      } catch {
        if (!cancelled) setError("Error de conexión con el servidor");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const q = normalize(search);
    if (!q) return events;

    return events.filter(
      (event) =>
        normalize(event.name).includes(q) ||
        normalize(event.location).includes(q),
    );
  }, [events, search]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString("es-AR", { day: "2-digit" }),
      month: date.toLocaleDateString("es-AR", { month: "short" }).toUpperCase(),
      year: date.toLocaleDateString("es-AR", { year: "numeric" }),
      time: date.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const formatPrice = (price: string | number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Number(price));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Explorar eventos
        </h1>
        <p className="text-neutral-400 text-sm">
          Descubrí los próximos conciertos, obras y más.
        </p>
      </div>

      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o ubicación..."
          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
        />
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 flex items-start gap-2">
          <span className="text-lg leading-none">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-500 text-sm">
            {search
              ? "No se encontraron eventos con esa búsqueda."
              : "No hay eventos disponibles por el momento."}
          </p>
        </div>
      )}

      {!loading && filteredEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((event) => {
            const { day, month, year, time } = formatDate(event.date);
            const imageSrc = getEventImage(event.id);

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="group text-left bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 flex flex-col cursor-pointer"
              >
                <div className="relative h-40 bg-gradient-to-br from-neutral-900 to-neutral-950 overflow-hidden">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiCalendar className="w-12 h-12 text-neutral-800" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                    <p className="text-amber-400 font-bold text-lg leading-none">
                      {day}
                    </p>
                    <p className="text-neutral-400 text-[10px] uppercase tracking-wider mt-0.5">
                      {month}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {event.name}
                  </h3>

                  <p className="text-neutral-500 text-xs line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  <div className="flex flex-col gap-2 mb-4 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-neutral-500 shrink-0" />
                      <span>
                        {day} {month} {year} · {time} hs
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-neutral-500 shrink-0" />
                      <span>Capacidad: {event.capacity}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-neutral-800">
                    <span className="text-amber-400 font-bold">
                      {formatPrice(event.price)}
                    </span>
                    <FiArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <EventModal
        event={selectedEvent}
        imageSrc={selectedEvent ? getEventImage(selectedEvent.id) : null}
        onClose={() => setSelectedEvent(null)}
        onSuccess={() => {}}
      />
    </div>
  );
}