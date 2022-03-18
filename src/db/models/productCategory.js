import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const ProductCategory = sequelize.define(
  "product_category",
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

export default ProductCategory;
