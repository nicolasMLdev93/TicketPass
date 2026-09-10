import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface EventAttributes {
  id: number;
  name: string;
  description: string;
  location: string;
  date: Date;
  price: number;
  capacity: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EventCreationAttributes
  extends Optional<EventAttributes, "id" | "image"> {}

class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare location: string;
  declare date: Date;
  declare price: number;
  declare capacity: number;
  declare image?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "events",
    timestamps: true,
  }
);

export default Event;