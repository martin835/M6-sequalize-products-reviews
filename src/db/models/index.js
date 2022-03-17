import Product from "./product.js";
import Review from "./review.js";
import User from "./user.js";
import Category from "./category.js";
import productCategory from "./productCategory.js";
import ProductCategory from "./productCategory.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});

Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});

export { Product, Review, User, Category, ProductCategory };
