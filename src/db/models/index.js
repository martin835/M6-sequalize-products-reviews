import Product from "./product.js";
import Review from "./review.js";
import Customer from "./customer.js";
import Category from "./category.js";

import ProductCategory from "./productCategory.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

Customer.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Customer, { onDelete: "CASCADE" });

Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});

Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});

export { Product, Review, Customer, Category, ProductCategory };
