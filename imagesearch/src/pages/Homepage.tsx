import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface IImage {
  link: string;
  kind: string;
}

const Homepage = () => {
  const { isAuthenticated } = useAuth0();
  const [images, setImages] = useState<IImage[]>([]);
  const [customSearch, setCustomSearch] = useState();

  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/customsearch/v1?key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }&cx=${
            import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
          }&num=10&searchType=image&q=stockholm`
        );
        console.log(search);
        setImages(response.data.items);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    search();
  }, []);

  const handleSubmit = (React.FormEventHandler<HTMLFormElement>) => {
    
  }

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
            <form>
              <label>
                <input
                  type="text"
                  name="searchfield"
                  placeholder="Search for images..."
                />
              </label>
              <button type="submit">Submit</button>
            </form>
            <div>
              <p>Did you mean ""?</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.link}
                alt={image.kind}
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
