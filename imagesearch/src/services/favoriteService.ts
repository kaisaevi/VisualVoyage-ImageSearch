import axios from "axios";
import { ImageObject } from "../models/ImageObject";

export const addToFavorites = async (
  selectedImage: ImageObject,
  userId: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/user/:userId/favorites",
      {
        userid: userId,
        imageLink: selectedImage.link,
      }
    );
    console.log("User data:", response.data);
    console.log("Image added to favorites:", selectedImage);
    return response.data;
  } catch (error) {
    console.error("Error adding image to favorites:", error);
    throw error;
  }
};
