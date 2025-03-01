import { useAuth0 } from "@auth0/auth0-react";

import ButtonPrimary from "@/components/Buttons/ButtonPrimary";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <ButtonPrimary
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: `${window.location.origin}`,
          },
        })
      }
    >
      Log Out
    </ButtonPrimary>
  );
};

export default LogoutButton;
