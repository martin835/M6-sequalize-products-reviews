import { Router } from "express";
import { Customer } from "../../db/models/index.js";

const router = Router();

//1 POST
router.post("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    console.log(req.body);
    const newCustomer = await Customer.create(req.body);
    res.send(newCustomer);
  } catch (error) {
    console.log(error);
  }
});

//2 GET ALL
router.get("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const data = await Customer.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//2.1 GET STATS
router.get("/stats", async (req, res, next) => {
  console.log("🆕PING - request");

  try {
    const data = await Customer.findAll();

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//3 GET ONE
router.get("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const oneCustomer = await Customer.findByPk(req.params.id);
    res.send(oneCustomer);
  } catch (error) {
    console.log(error);
  }
});
//4 EDIT
router.put("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const updatedCustomer = await Customer.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.send(updatedCustomer[1][0]);
  } catch (error) {
    console.log(error);
  }
});
//5 DELETE
router.delete("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const deletedCustomer = await Customer.destroy({
      where: { id: req.params.id },
    });
    console.log(deletedCustomer);
    res.send({ deletedCustomer });
  } catch (error) {
    console.log(error);
  }
});

export default router;
