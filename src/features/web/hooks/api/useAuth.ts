import * as React from "react";
// import { useQuery } from "@tanstack/react-query";
import { User, setApiToken } from "@/api";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();

  const [signinError, setSigninError] = React.useState("");
  const [signinLoading, setSigninLoading] = React.useState(false);
  const [signupError, setSignupError] = React.useState("");
  const [signupLoading, setSignupLoading] = React.useState(false);

  const handleSignin = React.useCallback(
    async (body: unknown) => {
      try {
        setSigninLoading(true);

        const response = await User.signin(body);

        setApiToken(response.data.data?.token);
        setSigninLoading(false);
        setSigninError("");

        router.push("/web/dashboard");
      } catch (error) {
        setSigninLoading(false);
        setSigninError((error as any).response.data.message);

        return (error as any).response;
      }
    },
    [router]
  );

  const handleSignup = React.useCallback(
    async (body: unknown) => {
      try {
        setSignupLoading(true);

        await User.signup(body);

        setSignupLoading(false);
        setSignupError("");

        router.push("/signin");
      } catch (error) {
        setSignupLoading(false);
        setSignupError((error as any).response.data.message);

        return (error as any).response;
      }
    },
    [router]
  );

  return {
    signinError,
    signinLoading,
    handleSignin,
    handleSignup,
    signupError,
    signupLoading,
  };
};
