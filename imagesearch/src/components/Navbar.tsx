import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="w-screen border-b-[1px] border-beige bg-brown flex justify-between">
      <div>
        <NavLink to="/">
          <img className="h-[80px] px-3" src="/camera.png" alt="camera" />
        </NavLink>
      </div>
      <div className="flex items-center">
        <ul className="flex items-center">
          <li className="cursor-pointer hover:text-light text-beige m-5 hover:scale-110">
            <NavLink to="/">HOME</NavLink>
          </li>
          <li className="cursor-pointer hover:text-light text-beige m-5 hover:scale-110">
            <NavLink to="/login">
              {isAuthenticated ? "LOG OUT" : "LOG IN"}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
