const fs = require("fs").promises;
const path = require("path");
const jsonFilePath = path.resolve(__dirname, "../../userData.json");

const checkOrCreateUser = async (req, res) => {
  const data = req.body;
  console.log(data);
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
    console.log("problem reading or writing file" + error);
  }
};

const fetchUserData = async (userId) => {
  try {
    const jsonData = await fs.readFile(jsonFilePath, "utf-8");
    let userData = JSON.parse(jsonData);
    console.log(userId);
    const user = userData.users.find((tmpUser) => tmpUser.userid === userId);
    console.log(user);
    if (user) return user;
  } catch (error) {
    console.error("Error fetching userdata", error);
    throw error;
  }
};

const fetchUserDataForClient = async (req, res) => {
  const userData = await fetchUserData(req.query.userId);
  console.log(userData);
  if (userData && userData.favoriteImages) {
    res.json(userData.favoriteImages);
  }
};

const addToFavorites = async (req, res) => {
  const userId = req.body.userId;
  const selectedImage = req.body.imageLink;
  console.log(selectedImage);
  console.log("KAISA");

  console.log(userId);
  console.log("FELIX!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  try {
    if (!userId) {
      return res.status(400).send("User ID is missing");
    }
    const user = await fetchUserData(userId);
    console.log("user:", user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.favoriteImages) {
      const isDuplicate = user.favoriteImages.some(
        (image) => image === selectedImage
      );

      if (isDuplicate) {
        return res.status(200).send("Image is already in favorites");
      } else {
        user.favoriteImages.push(selectedImage);
      }
    } else {
      user.favoriteImages = [selectedImage];
    }
    const jsonData = await fs.readFile(jsonFilePath, "utf-8");
    let userData = JSON.parse(jsonData);
    userData.users.forEach(function (part, index, array) {
      array[index] = user;
    });
    await fs.writeFile(jsonFilePath, JSON.stringify(userData, null, 2));
    console.log("Before success");
    res.status(200).send("Image added successfully to favorites");
  } catch (error) {
    console.error("Error adding image to favorites", error);
    res.status(500).send("Error adding image to favorites");
  }
};

module.exports = {
  fetchUserDataForClient,
  fetchUserData,
  checkOrCreateUser,
  addToFavorites,
};
