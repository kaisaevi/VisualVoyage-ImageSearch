import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <>
        <Navbar />
        <main className="bg-beige flex-grow">
          <Outlet />
        </main>
      </>
    </div>
  );
};

export default Layout;
