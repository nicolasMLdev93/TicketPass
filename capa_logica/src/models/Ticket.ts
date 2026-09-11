import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import type Reservation from "./Reservation"; 

interface TicketAttributes {
  id: number;
  reservationId: number;
  ticketCode: string;
  status: "valid" | "used" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

interface TicketCreationAttributes
  extends Optional<TicketAttributes, "id" | "status"> {}

class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  declare id: number;
  declare reservationId: number;
  declare ticketCode: string;
  declare status: "valid" | "used" | "cancelled";
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare reservation?: Reservation;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    reservationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ticketCode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("valid", "used", "cancelled"),
      allowNull: false,
      defaultValue: "valid",
    },
  },
  {
    sequelize,
    tableName: "tickets",
    timestamps: true,
  }
);

export default Ticket;