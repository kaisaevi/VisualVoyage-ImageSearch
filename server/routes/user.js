const express = require("express");
const router = express.Router();
const {
  checkOrCreateUser,
  addToFavorites,
  fetchUserData,
} = require("../controllers/userprofile.controller");

router.get("/fetch-user-data", fetchUserData);
router.post("/check-or-create-user", checkOrCreateUser);
router.post("/:userid/favorites", addToFavorites);

module.exports = router;
