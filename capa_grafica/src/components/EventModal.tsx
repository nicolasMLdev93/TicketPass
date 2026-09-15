import { useState, useEffect, type FormEvent } from "react";
import {
  FiX,
  FiCalendar,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiCreditCard,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers,
} from "react-icons/fi";
import { API_BASE_URL } from "../utils/config";

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

type Props = {
  event: Event | null;
  imageSrc?: string | null;
  onClose: () => void;
  onSuccess?: () => void;
};

type Step = "form" | "confirm" | "processing" | "success" | "error";

export default function EventModal({
  event,
  imageSrc,
  onClose,
  onSuccess,
}: Props) {
  const [step, setStep] = useState<Step>("form");
  const [quantity, setQuantity] = useState(1);
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [formError, setFormError] = useState("");
  const [processingError, setProcessingError] = useState("");

  useEffect(() => {
    if (event) {
      setStep("form");
      setQuantity(1);
      setCard({ number: "", name: "", expiry: "", cvv: "" });
      setFormError("");
      setProcessingError("");
    }
  }, [event]);

  useEffect(() => {
    if (!event) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [event]);

  if (!event) return null;

  const unitPrice = Number(event.price);
  const total = unitPrice * quantity;
  const maxQuantity = event.capacity;
  const canClose = step !== "processing";

  const handleBackdropClick = () => {
    if (canClose) onClose();
  };

  const handleClose = () => {
    if (canClose) onClose();
  };

  const increment = () => setQuantity((q) => Math.min(maxQuantity, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleCardChange = (field: keyof typeof card, value: string) => {
    let formatted = value;

    if (field === "number") {
      formatted = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (field === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      formatted =
        digits.length >= 3
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits;
    } else if (field === "cvv") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
    }

    setCard((c) => ({ ...c, [field]: formatted }));
    if (formError) setFormError("");
  };

  const validateForm = (): string | null => {
    if (quantity < 1) return "La cantidad mínima es 1 ticket";
    if (quantity > maxQuantity)
      return `Solo quedan ${maxQuantity} tickets disponibles`;
    if (card.number.replace(/\s/g, "").length !== 16)
      return "El número de tarjeta debe tener 16 dígitos";
    if (!card.name.trim()) return "Ingresá el nombre del titular";
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return "Fecha inválida, usá MM/AA";
    if (!/^\d{3,4}$/.test(card.cvv)) return "CVV inválido";
    return null;
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    setStep("confirm");
  };

  const handleConfirm = async () => {
    setStep("processing");
    setProcessingError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event.id,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al procesar la compra");
      }

      setStep("success");
      onSuccess?.();
    } catch (err) {
      setProcessingError(
        err instanceof Error ? err.message : "Error desconocido",
      );
      setStep("error");
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {canClose && (
          <button
            onClick={handleClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-10 text-neutral-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-neutral-800"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}

        {step === "form" && (
          <form onSubmit={handleContinue} className="p-6 flex flex-col gap-5">
            {imageSrc && (
              <div className="relative h-40 -mx-6 -mt-6 mb-2 overflow-hidden">
                <img
                  src={imageSrc}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {event.name}
              </h2>
              <div className="flex flex-col gap-1.5 text-sm text-neutral-400 mt-3">
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span className="capitalize">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>Capacidad: {event.capacity}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                Cantidad de tickets
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-xl text-white hover:border-amber-400/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increment}
                  disabled={quantity >= maxQuantity}
                  className="w-10 h-10 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-xl text-white hover:border-amber-400/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
                <span className="ml-auto text-sm text-neutral-500">
                  {formatPrice(unitPrice)} c/u
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-2 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-400">
                <FiCreditCard className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Datos de pago
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={card.number}
                  onChange={(e) => handleCardChange("number", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                  Nombre del titular
                </label>
                <input
                  type="text"
                  value={card.name}
                  onChange={(e) => handleCardChange("name", e.target.value)}
                  placeholder="Como figura en la tarjeta"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                    Vencimiento
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={card.expiry}
                    onChange={(e) => handleCardChange("expiry", e.target.value)}
                    placeholder="MM/AA"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">
                    CVV
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={card.cvv}
                    onChange={(e) => handleCardChange("cvv", e.target.value)}
                    placeholder="123"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                  />
                </div>
              </div>
            </div>

            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 flex items-start gap-2">
                <span className="text-lg leading-none">⚠️</span>
                <span>{formError}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">
                  Total
                </p>
                <p className="text-2xl font-bold text-amber-400">
                  {formatPrice(total)}
                </p>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                Continuar
              </button>
            </div>
          </form>
        )}

        {step === "confirm" && (
          <div className="p-6 flex flex-col gap-6">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                <FiAlertCircle className="w-7 h-7 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                ¿Confirmás la compra?
              </h2>
              <p className="text-neutral-400 text-sm">
                Revisá los datos antes de continuar
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Evento</span>
                <span className="text-white font-medium text-right">
                  {event.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Cantidad</span>
                <span className="text-white font-medium">
                  {quantity} ticket{quantity > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Tarjeta</span>
                <span className="text-white font-medium">
                  •••• {card.number.replace(/\s/g, "").slice(-4)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-800">
                <span className="text-neutral-400 font-medium">Total</span>
                <span className="text-amber-400 font-bold text-lg">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 bg-neutral-900 border border-neutral-800 text-white font-semibold py-3 rounded-xl hover:border-neutral-700 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="p-10 flex flex-col items-center gap-4">
            <FiLoader className="w-12 h-12 text-amber-400 animate-spin" />
            <h2 className="text-xl font-bold text-white">Procesando pago...</h2>
            <p className="text-neutral-400 text-sm text-center max-w-xs">
              No cierres esta ventana. Estamos confirmando tu reserva.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <FiCheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white">¡Compra exitosa!</h2>
            <p className="text-neutral-400 text-sm max-w-xs">
              Tus {quantity} ticket{quantity > 1 ? "s" : ""} para{" "}
              <span className="text-white font-medium">{event.name}</span> ya
              están reservados.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
            >
              Listo
            </button>
          </div>
        )}

        {step === "error" && (
          <div className="p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <FiAlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              No se pudo procesar
            </h2>
            <p className="text-neutral-400 text-sm max-w-xs">
              {processingError || "Ocurrió un error inesperado."}
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-neutral-900 border border-neutral-800 text-white font-semibold py-3 rounded-xl hover:border-neutral-700 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => setStep("confirm")}
                className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
