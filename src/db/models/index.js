import Product from "./product.js";
import Review from "./review.js";
import Customer from "./customer.js";
import Category from "./category.js";

import ProductCategory from "./productCategory.js";
import ShoppingCart from "./shoppingCart.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });
/*************************************************************************************/
Customer.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Customer, { onDelete: "CASCADE" });
/*************************************************************************************/
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});
Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});
ProductCategory.belongsTo(Product, { onDelete: "CASCADE" });
ProductCategory.belongsTo(Category, { onDelete: "CASCADE" });
Category.hasMany(ProductCategory, { onDelete: "CASCADE" });
Product.hasMany(ProductCategory, { onDelete: "CASCADE" });

/*************************************************************************************/
Product.belongsToMany(Customer, {
  //Product.findAll({include: Customer})
  through: { model: ShoppingCart, unique: false, onDelete: "CASCADE" },
});
Customer.belongsToMany(Product, {
  //Customer.findAll({include: Product})
  through: { model: ShoppingCart, unique: false, onDelete: "CASCADE" },
});

// ShoppingCart.findAll({include:Product})
// we need to do SUPER MANY-TO-MANY⬇️⬇️⬇️ ➡️ ➡️   https://sequelize.org/v6/manual/advanced-many-to-many.html#many-to-many-to-many-relationships-and-beyond

ShoppingCart.belongsTo(Product, { onDelete: "CASCADE" });
ShoppingCart.belongsTo(Customer, { onDelete: "CASCADE" });
Product.hasMany(ShoppingCart, { onDelete: "CASCADE" });
Customer.hasMany(ShoppingCart, { onDelete: "CASCADE" });

export { Product, Review, Customer, Category, ProductCategory, ShoppingCart };
