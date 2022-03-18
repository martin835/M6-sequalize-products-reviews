import { Router } from "express";
import {
  Product,
  Review,
  ProductCategory,
  Category,
  Customer,
  ShoppingCart,
} from "../../db/models/index.js";
import { Op } from "sequelize";

const router = Router();

//1 POST
router.post("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    console.log(req.body);
    const { categoryId, ...rest } = req.body;
    const newProduct = await Product.create(rest);

    const productCategory = await ProductCategory.create({
      productId: newProduct.id,
      categoryId: categoryId,
    });

    //res.status(201).send(newProduct, productCategory);  --> DOESN'T work - something wrong with send()  object
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
  }
});

//2.0 GET ALL - filter by product & description by query
//localhost:3001/products?name=car&description=orient
//localhost:3001/products?order=price,ASC
router.get("/", async (req, res, next) => {
  console.log("🆕PING - request");
  // -- this crashes app when there is no order search param :) =>console.log(req.query.category.split(","));

  try {
    const data = await Product.findAll({
      include: [
        {
          model: Category,
          through: { attributes: [] },
          where: {
            ...(req.query.category && {
              name: { [Op.in]: req.query.category.split(",") },
            }),
          },
        },
        { model: Review, include: Customer },
      ],
      limit: 10,
      offset: 0,

      /*  where: {
        ...(req.query.search && {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${req.query.search}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${req.query.search}%`,
              },
            },
          ],
        }),
        //not working because price after split in the array is string
        ...(req.query.price && {
          price: {
            [Op.between]: req.query.price.split(","),
          },
        }),
      },
      ...(req.query.order && { order: [req.query.order.split(",")] }), */
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//2.1 GET ALL - price range
//localhost:3001/products/price?p1=0&p2=100
router.get("/price", async (req, res, next) => {
  console.log("🆕PING - request");
  console.log(typeof parseInt(req.query.p1), parseInt(req.query.p1));
  console.log(typeof parseInt(req.query.p2), parseInt(req.query.p2));
  try {
    const data = await Product.findAll({
      include: Review,
      where: {
        price: {
          [Op.between]: [
            `${parseInt(req.query.p1)}`,
            `${parseInt(req.query.p2)}`,
          ],
        },
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//3 GET ONE
router.get("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const oneProduct = await Product.findByPk(req.params.id, {
      include: Review,
    });
    res.send(oneProduct);
  } catch (error) {
    console.log(error);
  }
});
//4 EDIT
router.put("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.send(updatedProduct[1][0]);
  } catch (error) {
    console.log(error);
  }
});
//5 DELETE
router.delete("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    console.log(deletedProduct);
    res.send({ deletedProduct });
  } catch (error) {
    console.log(error);
  }
});

export default router;
