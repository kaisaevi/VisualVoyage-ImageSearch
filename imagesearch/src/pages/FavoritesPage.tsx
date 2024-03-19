import { useEffect, useState } from "react";
import axios from "axios";
import { ImageObject } from "../models/ImageObject";

const FavoritesPage = () => {
  const [favoriteImages, setFavoritImages] = useState<ImageObject[]>([]);

  useEffect(() => {
    const fetchFavoriteImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/favorites"
        );
        setFavoritImages(response.data);
      } catch (error) {
        console.error("Error fetching favourite images");
      }
    };
    fetchFavoriteImages();
  });

  return (
    <>
      <div>
        <h2>Favorite Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {favoriteImages.map((image, index) => (
            <div key={index}>
              <img src={image.link} alt={`Favorite ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
