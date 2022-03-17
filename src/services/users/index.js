import { Router } from "express";
import { User } from "../../db/models/index.js";

const router = Router();

//1 POST
router.post("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

//2 GET ALL
router.get("/", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
//3 GET ONE
router.get("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const oneUser = await User.findByPk(req.params.id);
    res.send(oneUser);
  } catch (error) {
    console.log(error);
  }
});
//4 EDIT
router.put("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.send(updatedUser[1][0]);
  } catch (error) {
    console.log(error);
  }
});
//5 DELETE
router.delete("/:id", async (req, res, next) => {
  console.log("🆕PING - request");
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });
    console.log(deletedUser);
    res.send({ deletedUser });
  } catch (error) {
    console.log(error);
  }
});

export default router;
