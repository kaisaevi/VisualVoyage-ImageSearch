import { User, useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { addToFavorites } from "../services/favoriteService";
import { ImageObject } from "../models/ImageObject";
// import { FaStar } from "react-icons/fa6";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth0();
  const [images, setImages] = useState<ImageObject[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [spelling, setSpelling] = useState<string | null>("");
  const [searchTime, setSearchTime] = useState<number>();

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (isAuthenticated && user) {
        try {
          await axios.post("http://localhost:3000/user/check-or-create-user", {
            userid: user.sub,
          });
        } catch (error) {
          console.error("Error checking or creating user:", error);
        }
      }
    };

    checkOrCreateUser();
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSearch(searchQuery);
  };

  const doSearch = async (searchQuery: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&cx=${
          import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
        }&num=10&searchType=image&q=${searchQuery}`
      );
      setImages(response.data.items);
      setSearchTime(response.data.searchInformation.searchTime);
      let imageObjects: ImageObject[] = [];
      if (response.data.items) {
        imageObjects = response.data.items.map((item: any): ImageObject => {
          return new ImageObject(item.link, item.kind);
        });
        setImages((prevImages) => [...prevImages, ...imageObjects]);
      }

      if (response.data.spelling && response.data.spelling.correctedQuery) {
        setSpelling(response.data.spelling.correctedQuery);
      } else {
        setSpelling(null);
      }
    } catch (error) {
      console.error("Error fetching images!!!", error);
    }
  };

  const handleSuggestionClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    suggestedQuery: string
  ) => {
    setSearchQuery(suggestedQuery);
    doSearch(suggestedQuery);
  };

  const handleAddToFavorites = async (
    userId: User | undefined,
    selectedImage: ImageObject
  ) => {
    if (userId && userId.sub) {
      await addToFavorites(selectedImage, userId.sub);
    } else {
      console.error("User is not authenticated.");
    }
  };

  return (
    <>
      <main>
        <div>
          <NavLink to="/">
            <img
              className="h-[220px] mx-auto"
              src="/visualvoyage.png"
              alt="visualvoyage logo"
            />
          </NavLink>
        </div>
        <div className="flex items-center flex-col">
          {!isAuthenticated && (
            <p className="text-purple m-3">
              Visual Voyage is just a login away!
            </p>
          )}
          {isAuthenticated && (
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  name="searchfield"
                  placeholder="Search for images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-purple bg-light rounded-md py-2 px-1 m-2 shadow-lg"
                />
              </label>
              <button
                className="bg-brown text-light py-1 px-3 rounded-md hover:bg-purple shadow-lg"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
          {isAuthenticated && (
            <div>
              {spelling && (
                <p>
                  {`Did you mean `}
                  <a
                    href="#"
                    onClick={(e) => handleSuggestionClick(e, spelling)}
                    className="font-bold"
                  >
                    {spelling}
                  </a>
                  ?
                </p>
              )}
              {searchTime && (
                <p className="text-brown">Searchtime: {searchTime}s</p>
              )}
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.link}
                alt={`${image.kind} ${searchQuery}`}
                className="rounded-md m-2 shadow-lg"
              />
              <div className="flex items-center justify-center">
                <button
                  className="flex items-center "
                  onClick={() => handleAddToFavorites(user, image)}
                >
                  <FaRegStar /> {/* <FaStar /> */}
                  <p className="ml-1">Add to Favorites</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
export default HomePage;
