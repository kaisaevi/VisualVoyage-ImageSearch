import axios from "axios";
import { ImageObject } from "../models/ImageObject";

export const addToFavorites = async (
  selectedImage: ImageObject,
  id: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/user/${id}/favorites`,
      {
        userId: id,
        imageLink: selectedImage.link,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding image to favorites:", error);
    throw error;
  }
};
