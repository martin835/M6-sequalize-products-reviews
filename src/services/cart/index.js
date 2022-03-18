import { Router } from "express";
import { ShoppingCart, Product } from "../../db/models/index.js";
import sequelize from "sequelize";

const router = Router();

//1 Get All Products by CustomerId

router.get("/:customerId", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const data = await ShoppingCart.findAll({
      include: Product,
      attributes: [
        "productId",
        [sequelize.fn("count", sequelize.col("shopping_cart.id")), "unitQty"],
        [sequelize.fn("sum", sequelize.col("product.price")), "unitTotalPrice"],
      ],
      group: ["productId", "product.id"],
      where: { customerId: req.params.customerId },
    });

    const totalQty = await ShoppingCart.count({
      where: {
        customerId: req.params.customerId,
      },
    });

    const totalSum = await ShoppingCart.sum("product.price", {
      include: { model: Product, attributes: [] },
      where: {
        customerId: req.params.customerId,
      },
    });

    res.send({ data, totalQty, totalSum });
  } catch (error) {
    console.log(error);
  }
});

//2 Post a Product by a Customer by ProductId

router.post("/:customerId", async (req, res, next) => {
  console.log("🆕PING - request");
  console.log(req.params);

  try {
    const { customerId } = req.params;
    const { productId } = req.body;

    const newCartItem = await ShoppingCart.create({
      productId: productId,
      customerId: customerId,
    });
    res.send(newCartItem.id);
  } catch (error) {
    console.log(error);
  }
});

//3 Delete a Product by a Customer by ProductId

router.delete("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const removedCartItem = await ShoppingCart.destroy({
      where: { id: req.params.id },
    });

    console.log(removedCartItem);
    res.send({ removedCartItem });
  } catch (error) {
    console.log(error);
  }
});

export default router;
