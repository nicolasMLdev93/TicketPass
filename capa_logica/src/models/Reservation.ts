import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import type User from "./User";
import type Event from "./Event";
import type Ticket from "./Ticket";

interface ReservationAttributes {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReservationCreationAttributes
  extends Optional<ReservationAttributes, "id" | "status"> {}

class Reservation
  extends Model<ReservationAttributes, ReservationCreationAttributes>
  implements ReservationAttributes
{
  declare id: number;
  declare userId: number;
  declare eventId: number;
  declare quantity: number;
  declare total: number;
  declare status: "pending" | "confirmed" | "cancelled";
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // 👇 NUEVO: declarar las asociaciones
  declare user?: User;
  declare event?: Event;
  declare tickets?: Ticket[];
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue("total");
        return value !== null ? parseFloat(value as unknown as string) : 0;
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "reservations",
    timestamps: true,
  }
);

export default Reservation;