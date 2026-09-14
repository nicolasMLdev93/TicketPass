import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiMapPin,
  FiLoader,
  FiTag,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";
import QRCode from "react-qr-code";
import { API_BASE_URL } from "../utils/config";

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

type Ticket = {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  total?: string | number;
  status?: string;
  createdAt: string;
  event?: Event;
};

interface ReservationsResponse {
  reservations: Ticket[];
  message?: string;
}

type CancelStep = "confirm" | "processing" | "success" | "error";

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ticketToCancel, setTicketToCancel] = useState<Ticket | null>(null);
  const [cancelStep, setCancelStep] = useState<CancelStep>("confirm");
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchTickets = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/reservations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data: ReservationsResponse = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error al cargar reservas");
        }
        const filtered = data.reservations.filter(
          (res: Ticket) => res.status != "cancelled",
        );
        if (!cancelled) setTickets(filtered ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Error de conexión con el servidor",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTickets();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ticketToCancel) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [ticketToCancel]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return {
      day: date.toLocaleDateString("es-AR", { day: "2-digit" }),
      month: date.toLocaleDateString("es-AR", {
        month: "short",
      }).toUpperCase(),
      year: date.toLocaleDateString("es-AR", {
        year: "numeric",
      }),
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

  const isUpcoming = (dateStr: string) => new Date(dateStr) > new Date();

  const buildTicketCode = (ticketId: number) =>
    `#${String(ticketId).padStart(6, "0")}`;

  const openCancelModal = (ticket: Ticket) => {
    setTicketToCancel(ticket);
    setCancelStep("confirm");
    setCancelError("");
  };

  const closeCancelModal = () => {
    if (cancelStep === "processing") return;

    setTicketToCancel(null);
    setCancelStep("confirm");
    setCancelError("");
  };

  const handleCancelConfirm = async () => {
    if (!ticketToCancel) return;

    setCancelStep("processing");
    setCancelError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE_URL}/reservations/${ticketToCancel.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Error al cancelar la reserva");
      }

      setTickets((prev) =>
        prev.filter((t) => t.id !== ticketToCancel.id),
      );

      setCancelStep("success");
    } catch (err) {
      setCancelError(
        err instanceof Error ? err.message : "Error desconocido",
      );

      setCancelStep("error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Mis reservas
        </h1>

        <p className="text-neutral-400 text-sm">
          Consultá tus entradas y su estado actual.
        </p>
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

      {!loading && !error && tickets.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <FiTag className="w-7 h-7 text-neutral-600" />
          </div>

          <p className="text-neutral-500 text-sm">
            Todavía no tenés reservas.
          </p>
        </div>
      )}

      {!loading && tickets.length > 0 && (
        <div className="flex flex-col gap-4">
          {tickets.map((ticket) => {
            const event = ticket.event;
            const imageSrc = event ? getEventImage(event.id) : null;
            const upcoming = event ? isUpcoming(event.date) : false;
            const eventDate = event ? formatDate(event.date) : null;
            const ticketCode = buildTicketCode(ticket.id);

            return (
              <div
                key={ticket.id}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-40 sm:h-auto bg-gradient-to-br from-neutral-900 to-neutral-950 shrink-0 overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={event?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiCalendar className="w-10 h-10 text-neutral-800" />
                      </div>
                    )}

                    {eventDate && (
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                        <p className="text-amber-400 font-bold text-lg leading-none">
                          {eventDate.day}
                        </p>

                        <p className="text-neutral-400 text-[10px] uppercase tracking-wider mt-0.5">
                          {eventDate.month}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-white font-semibold text-lg line-clamp-2">
                        {event?.name ?? `Evento #${ticket.eventId}`}
                      </h3>

                      <span
                        className={`shrink-0 text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          upcoming
                            ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                            : "bg-neutral-800/50 border-neutral-700 text-neutral-500"
                        }`}
                      >
                        {upcoming ? "Próximo" : "Finalizado"}
                      </span>
                    </div>

                    {event && (
                      <div className="flex flex-col gap-2 mb-4 text-sm text-neutral-400">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                          <span className="truncate">
                            {event.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4 text-neutral-500 shrink-0" />
                          <span>
                            {eventDate?.day} {eventDate?.month}{" "}
                            {eventDate?.year} · {eventDate?.time} hs
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-neutral-800">
                      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1 min-w-[200px]">
                          <div>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">
                              Cantidad
                            </p>

                            <p className="text-white font-semibold text-sm">
                              {ticket.quantity} ticket
                              {ticket.quantity > 1 ? "s" : ""}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">
                              Código
                            </p>

                            <p className="text-white font-semibold text-sm font-mono">
                              {ticketCode}
                            </p>
                          </div>

                          <div className="col-span-2 sm:col-span-1">
                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">
                              Total
                            </p>

                            <p className="text-amber-400 font-bold text-sm">
                              {ticket.total != null
                                ? formatPrice(ticket.total)
                                : event
                                  ? formatPrice(
                                      Number(event.price) *
                                        ticket.quantity,
                                    )
                                  : "—"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-end justify-between lg:justify-end gap-4 shrink-0">
                          {upcoming && (
                            <button
                              type="button"
                              onClick={() => openCancelModal(ticket)}
                              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs font-semibold uppercase tracking-wider px-2 py-2 rounded-lg transition-all"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              Cancelar reserva
                            </button>
                          )}

                          <div className="bg-white p-2 rounded-lg shadow-lg">
                            <QRCode
                              value={ticketCode}
                              size={72}
                              level="M"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {ticketToCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeCancelModal}
        >
          <div
            className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            {cancelStep !== "processing" && (
              <button
                onClick={closeCancelModal}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 text-neutral-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-neutral-800"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}

            {cancelStep === "confirm" && (
              <div className="p-6 flex flex-col gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <FiAlertCircle className="w-7 h-7 text-red-400" />
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2">
                    ¿Estás seguro?
                  </h2>

                  <p className="text-neutral-400 text-sm">
                    Esta acción cancelará tu reserva para{" "}
                    <span className="text-white font-medium">
                      {ticketToCancel.event?.name ??
                        `Evento #${ticketToCancel.eventId}`}
                    </span>
                    . El monto abonado será reembolsado.
                  </p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Código</span>

                    <span className="text-white font-medium font-mono">
                      {buildTicketCode(ticketToCancel.id)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">Cantidad</span>

                    <span className="text-white font-medium">
                      {ticketToCancel.quantity} ticket
                      {ticketToCancel.quantity > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-neutral-800">
                    <span className="text-neutral-400 font-medium">
                      Reembolso
                    </span>

                    <span className="text-amber-400 font-bold text-lg">
                      {ticketToCancel.total != null
                        ? formatPrice(ticketToCancel.total)
                        : ticketToCancel.event
                          ? formatPrice(
                              Number(ticketToCancel.event.price) *
                                ticketToCancel.quantity,
                            )
                          : "—"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeCancelModal}
                    className="flex-1 bg-neutral-900 border border-neutral-800 text-white font-semibold py-3 rounded-xl hover:border-neutral-700 transition-colors"
                  >
                    Volver
                  </button>

                  <button
                    onClick={handleCancelConfirm}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-500/20"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            )}

            {cancelStep === "processing" && (
              <div className="p-10 flex flex-col items-center gap-4">
                <FiLoader className="w-12 h-12 text-red-400 animate-spin" />

                <h2 className="text-xl font-bold text-white">
                  Cancelando reserva...
                </h2>

                <p className="text-neutral-400 text-sm text-center max-w-xs">
                  No cierres esta ventana. Estamos procesando la cancelación.
                </p>
              </div>
            )}

            {cancelStep === "success" && (
              <div className="p-6 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <FiCheckCircle className="w-8 h-8 text-green-400" />
                </div>

                <h2 className="text-xl font-bold text-white">
                  Cancelación exitosa
                </h2>

                <p className="text-neutral-400 text-sm max-w-xs">
                  Tu reserva fue cancelada correctamente. El dinero será
                  reembolsado a la brevedad.
                </p>

                <button
                  onClick={closeCancelModal}
                  className="mt-2 w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  Entendido
                </button>
              </div>
            )}

            {cancelStep === "error" && (
              <div className="p-6 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <FiAlertCircle className="w-8 h-8 text-red-400" />
                </div>

                <h2 className="text-xl font-bold text-white">
                  No se pudo cancelar
                </h2>

                <p className="text-neutral-400 text-sm max-w-xs">
                  {cancelError || "Ocurrió un error inesperado."}
                </p>

                <div className="flex gap-3 w-full mt-2">
                  <button
                    onClick={closeCancelModal}
                    className="flex-1 bg-neutral-900 border border-neutral-800 text-white font-semibold py-3 rounded-xl hover:border-neutral-700 transition-colors"
                  >
                    Cerrar
                  </button>

                  <button
                    onClick={handleCancelConfirm}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-500/20"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

