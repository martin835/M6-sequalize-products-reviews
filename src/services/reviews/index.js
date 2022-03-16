import { Router } from "express";
import { Review } from "../../db/models/index.js";

const router = Router();

//1 POST
router.post("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    console.log(req.body);
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    console.log(error);
  }
});

//2 GET ALL
router.get("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const data = await Review.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
//3 GET ONE
router.get("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const oneReview = await Review.findByPk(req.params.id);
    res.send(oneReview);
  } catch (error) {
    console.log(error);
  }
});
//4 EDIT
router.put("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const updatedReview = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.send(updatedReview[1][0]);
  } catch (error) {
    console.log(error);
  }
});
//5 DELETE
router.delete("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const deletedReview = await Review.destroy({
      where: { id: req.params.id },
    });
    console.log(deletedReview);
    res.send({ deletedReview });
  } catch (error) {
    console.log(error);
  }
});

export default router;
