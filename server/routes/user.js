const express = require("express");
const router = express.Router();
const Validator = require("../middlewares/Validator");

const {
  checkOrCreateUser,
  addToFavorites,
  fetchUserDataForClient,
} = require("../controllers/userprofile.controller");

router.get("/fetch-user-data", fetchUserDataForClient);
router.post(
  "/check-or-create-user",
  Validator("checkOrCreate"),
  checkOrCreateUser
);
router.post("/:userid/favorites", Validator("favorites"), addToFavorites);

module.exports = router;
