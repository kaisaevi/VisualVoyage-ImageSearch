import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

interface IImage {
  link: string;
  kind: string;
}

const Homepage = () => {
  const { isAuthenticated } = useAuth0();
  const [images, setImages] = useState<IImage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [spelling, setSpelling] = useState<string | null>("");
  const [searchTime, setSearchTime] = useState<number>();

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
      console.log("API Response:", response.data);
      setImages(response.data.items);
      setSearchTime(response.data.searchInformation.searchTime);
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
          {!isAuthenticated && (
            <div>
              {spelling && (
                <p>
                  {`Did you mean `}
                  <a
                    href="#"
                    onClick={(e) => handleSuggestionClick(e, spelling)}
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
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Homepage;
