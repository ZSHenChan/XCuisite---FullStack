import { useAuth0 } from "@auth0/auth0-react";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const handleLoginClick = () => {
    loginWithRedirect({
      appState: {
        targetUrl: window.location.href,
      },
    });
  };

  return <ButtonPrimary onClick={handleLoginClick}>Log In</ButtonPrimary>;
};

export default LoginButton;
