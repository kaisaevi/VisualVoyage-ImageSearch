import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-screen border-b-[1px] border-beige bg-brown">
      <div className="flex justify-end">
        <ul className="flex">
          <li className="cursor-pointer hover:text-light text-beige m-5 hover:scale-110">
            <NavLink to="/">HOME</NavLink>
          </li>
          <li className="cursor-pointer hover:text-light text-beige m-5 hover:scale-110">
            <NavLink to="/login">LOG IN</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
