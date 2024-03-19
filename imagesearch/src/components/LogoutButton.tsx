import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <button
        className="bg-brown text-light py-1 px-3 rounded-md hover:bg-purple shadow-lg"
        onClick={() => logout()}
      >
        Log Out
      </button>
    )
  );
};

export default LogoutButton;
