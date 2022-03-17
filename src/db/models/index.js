import Product from "./product.js";
import Review from "./review.js";
import User from "./user.js";
import Category from "./category.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

export { Product, Review, User, Category };
