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

const fetchUserData = async (req, res) => {
  try {
    const jsonData = await fs.readFile(jsonFilePath, "utf-8");
    let userData = JSON.parse(jsonData);
    const user = userData.users.find(
      (tmpUser) => tmpUser.userid === req.userId
    );
    if (!user) {
      const username = userData.users.find(
        (tmpUser) => tmpUser.userid === req.userId
      ).username;
      return username;
    }
    return user;
  } catch (error) {
    console.error("Error fetching userdata", error);
    throw error;
  }
};

const addToFavorites = async (req, res) => {
  const userId = req.params.userId;
  const selectedImage = req.body.selectedImage;
  console.log("FELIX HEJ");
  try {
    if (!userId) {
      console.log("FELIX HEJ no user id");

      return res.status(400).send("User ID is missing");
    }
    const user = await fetchUserData(req, res);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isDuplicate = user.favoriteImages.some(
      (image) => image.link === selectedImage.link
    );

    if (isDuplicate) {
      console.log("FELIX HEJ duplicate");
      return res.status(400).send("Image already exists in favorites");
    }

    user.favoriteImages.push(selectedImage);

    await fs.writeFile(jsonFilePath, JSON.stringify(userData, null, 2));
    console.log("Before success");
    res.status(200).send("Image added successfully to favorites");
  } catch (error) {
    console.error("Error adding image to favorites", error);
    res.status(500).send("Error adding image to favorites");
  }
};

module.exports = { fetchUserData, checkOrCreateUser, addToFavorites };
