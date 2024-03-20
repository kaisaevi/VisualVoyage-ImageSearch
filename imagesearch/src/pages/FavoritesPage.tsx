import { useEffect, useState } from "react";
import axios from "axios";
import { ImageObject } from "../models/ImageObject";
import { useAuth0 } from "@auth0/auth0-react";

const FavoritesPage = () => {
  const { user } = useAuth0();

  const [favoriteImages, setFavoritImages] = useState<ImageObject[]>([]);

  useEffect(() => {
    const fetchFavoriteImages = async () => {
      try {
        if (user && user.sub) {
          console.log(user.sub);
          const response = await axios.get(
            `http://localhost:3000/user/fetch-user-data?userId=${user.sub}`
          );
          console.log("response data är: ", response.data);
          setFavoritImages(response.data);
        }
      } catch (error) {
        console.error("Error fetching favourite images");
      }
    };
    fetchFavoriteImages();
  }, [user, setFavoritImages]);

  return (
    <>
      <div>
        <h2 className="text-center text-4xl p-5 text-purple">
          Your Favorite Images
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {favoriteImages.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Favorite ${index + 1}`}
                className="rounded-md m-2 shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
