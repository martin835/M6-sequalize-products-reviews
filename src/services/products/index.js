import { Router } from "express";
import { Product } from "../../db/models/index.js";

const router = Router();

//1 POST
router.post("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    console.log(req.body);
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
  }
});

//2 GET ALL
router.get("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const data = await Product.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
//3 GET ONE
router.get("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const oneProduct = await Product.findByPk(req.params.id);
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
