import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const ShoppingCart = sequelize.define(
  "shopping_cart",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    timestamps: false,
  }
);

export default ShoppingCart;
