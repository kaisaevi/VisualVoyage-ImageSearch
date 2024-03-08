import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const LogInPage = () => {
  return (
    <main className="bg-light flex flex-col">
      <h1>Auth0 Login</h1>
      <LoginButton />
      <LogoutButton />
    </main>
  );
};

export default LogInPage;
