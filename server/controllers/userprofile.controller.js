const fs = require("fs").promises;
const path = require("path");
const jsonFilePath = path.resolve(__dirname, "../../userData.json");
const Joi = require("joi");
const userSchema = require("../schemas/userSchema");

const checkOrCreateUser = async (req, res) => {
  const data = req.body;
  const userIdFromBody = data.userid;
  try {
    const jsonData = await fs.readFile(jsonFilePath, "utf-8");
    let userData = JSON.parse(jsonData);
    const existingUser = userData.users.find(
      (user) => user.userid === userIdFromBody
    );

    if (existingUser) {
      console.log("User exists", existingUser);
      res.json(existingUser);
    } else {
      const newUser = { userid: userIdFromBody };
      userData.users.push(newUser);
      await fs.writeFile(jsonFilePath, JSON.stringify(userData, null, 2));

      console.log("New user created:", newUser);

      res.json(newUser);
    }
  } catch (error) {
    console.error("problem reading or writing file" + error);
  }
};

const fetchUserData = async (userId) => {
  try {
    const jsonData = await fs.readFile(jsonFilePath, "utf-8");
    let userData = JSON.parse(jsonData);
    const user = userData.users.find((tmpUser) => tmpUser.userid === userId);
    if (user) return user;
  } catch (error) {
    console.error("Error fetching userdata", error);
    throw error;
  }
};

const fetchUserDataForClient = async (req, res) => {
  const userData = await fetchUserData(req.query.userId);
  if (userData && userData.favoriteImages) {
    res.json(userData.favoriteImages);
  }
};

const addToFavorites = async (req, res) => {
  const userId = req.body.userId;
  const selectedImage = req.body.imageLink;

  try {
    const user = await fetchUserData(userId);

    if (!user) {
      return res.status(404).send("Användare hittades inte");
    }
    const { error, value } = userSchema.validate({
      userString: userId,
      favoriteImage: selectedImage,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (user.favoriteImages) {
      const isDuplicate = user.favoriteImages.some(
        (image) => image === selectedImage
      );

      if (isDuplicate) {
        return res.status(200).send("Bilden finns redan i favoriter");
      } else {
        user.favoriteImages.push(selectedImage);
      }
    } else {
      console.log("Creating new favorite images");
      user.favoriteImages = [selectedImage];
    }

    // Make sure that jsonFilePath is correctly defined and points to the right JSON file.
    // Also, ensure that the fetchUserData function works correctly.

    const jsonData = await fs.readFile(jsonFilePath, "utf-8");
    let userData = JSON.parse(jsonData);

    // Update the user's data in the read data.
    userData.users.forEach(function (part, index, array) {
      console.log("index ", index, " userId ", array[index].userid);
      console.log("incoming userid " + user.userid);
      if (array[index].userid === user.userid) {
        array[index] = user;
      }
    });

    // Write back the updated userdata to the JSON file.
    await fs.writeFile(jsonFilePath, JSON.stringify(userData, null, 2));

    res.status(200).send("Bilden lades till i favoriter framgångsrikt");
  } catch (error) {
    console.error("Fel vid tillägg av bild till favoriter", error);
    res.status(500).send("Fel vid tillägg av bild till favoriter");
  }
};

module.exports = {
  fetchUserDataForClient,
  fetchUserData,
  checkOrCreateUser,
  addToFavorites,
};
