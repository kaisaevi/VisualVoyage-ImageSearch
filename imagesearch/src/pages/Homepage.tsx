import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";

interface IImage {
  link: string;
  kind: string;
}

const Homepage = () => {
  const { isAuthenticated } = useAuth0();
  const [images, setImages] = useState<IImage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [spelling, setSpelling] = useState<string | null>("");

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
      <main className="bg-beige ">
        <div className="flex justify-center">
          <div className="w-[100px] h-[100px] m-2">
            <img
              className="rounded-md border border-gray-400"
              src="/logo.png"
              alt="camera logo"
            ></img>
          </div>
          <div>
            <h2 className="text-5xl text-purple">SnapSearch</h2>
            <div>
              {" "}
              {!isAuthenticated && <p>SnapSearch is just a login away!</p>}
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  name="searchfield"
                  placeholder="Search for images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </label>
              <input type="submit" value={"Submit"}></input>
            </form>
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
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.link}
                alt={`${image.kind} ${searchQuery}`}
                className="rounded-md m-2"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Homepage;
