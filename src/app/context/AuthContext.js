"use client";

// import EnvConfig from "@/config/orm.config";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
// import { API_AUDIENCE, CLIENT_ID, DOMAIN } from "@/auth/constants";

import { SpinnerFull } from "@/components/Feedback/Spinner";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  function getRedirectUri() {
    if (typeof window !== "undefined") {
      const redirect_uri = window.location.href;
      // console.log("getRedirectUrl called.", `${redirect_uri}`);
      return redirect_uri;
    } else {
      // console.log("window not defined");
      return process.env.NEXT_PUBLIC_AUTH0_BASE_URL; // Default value for server-side rendering
    }
  }

  const onRedirectCallback = (appState) => {
    router.push(appState?.targetUrl || "/");
  };

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: getRedirectUri(),
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
      }}
    >
      <AuthState>{children}</AuthState>
    </Auth0Provider>
  );
}

function AuthState({ children }) {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
          localStorage.setItem("authToken", accessToken);
        } catch (err) {
          console.error("Error getting token", err);
        }
      } else {
        setToken(null);
        localStorage.removeItem("authToken");
      }
    };
    fetchToken();
  }, [isAuthenticated]);

  if (isLoading) {
    return <SpinnerFull />;
  }

  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}

// Hooks
export function useAuthToken() {
  return useContext(AuthContext);
}

export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated;
}
