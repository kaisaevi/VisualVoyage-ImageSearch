import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <>
        <Navbar />
        <main className="bg-beige h-screen">
          <Outlet />
        </main>
      </>
    </div>
  );
};

export default Layout;
