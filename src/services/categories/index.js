import { Router } from "express";
import { Category } from "../../db/models/index.js";

const router = Router();

//1 POST
router.post("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    console.log(req.body);
    const newCategory = await Category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    console.log(error);
  }
});

//2 GET ALL
router.get("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const data = await Category.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
//3 GET ONE
router.get("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const oneCategory = await Category.findByPk(req.params.id);
    res.send(oneCategory);
  } catch (error) {
    console.log(error);
  }
});
//4 EDIT
router.put("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.send(updatedCategory[1][0]);
  } catch (error) {
    console.log(error);
  }
});
//5 DELETE
router.delete("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    console.log(deletedCategory);
    res.send({ deletedCategory });
  } catch (error) {
    console.log(error);
  }
});

export default router;
