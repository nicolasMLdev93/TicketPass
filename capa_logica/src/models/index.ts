import User from "./User";
import Event from "./Event";
import Reservation from "./Reservation";
import Ticket from "./Ticket";

User.hasMany(Reservation, {
  foreignKey: "userId",
  as: "reservations",
});

Reservation.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Event.hasMany(Reservation, {
  foreignKey: "eventId",
  as: "reservations",
});

Reservation.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});

Reservation.hasMany(Ticket, {
  foreignKey: "reservationId",
  as: "tickets",
});

Ticket.belongsTo(Reservation, {
  foreignKey: "reservationId",
  as: "reservation",
});

export {
  User,
  Event,
  Reservation,
  Ticket,
};